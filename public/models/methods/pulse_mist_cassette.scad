// PULSE-MIST: detachable, research-only liquid-pulse cassette for MIST-PAIR/CAGE.
// Illustrative geometry in millimetres. No pressure, flow, dose, nozzle, or flight rating.
$fn=48;
ring_r=142;
sample_h=128;
plane_z=[55,128,201];

// Open support rings and four attach ears: deliberately a bench/fixture interface.
color([.62,.70,.74]) for(z=[30,226]) difference(){
  translate([0,0,z]) cylinder(r=ring_r+8,h=6,center=true);
  translate([0,0,z]) cylinder(r=ring_r-2,h=8,center=true);
}
color([.62,.70,.74]) for(a=[0:90:270]) rotate([0,0,a])
  translate([ring_r,0,128]) cube([8,8,196],center=true);
for(a=[45:90:315]) rotate([0,0,a]){
  color([.08,.14,.18]) translate([ring_r+13,0,226]) cube([28,18,12],center=true);
  color([.97,.60,.16]) translate([ring_r+29,0,226]) cylinder(d=8,h=8,center=true);
}

// Four independently timed liquid valve envelopes; opposing pairs are identifiable.
for(a=[0:90:270]) rotate([0,0,a]){
  color([.08,.14,.18]) translate([0,ring_r-8,195]) cube([46,30,36],center=true);
  color([.10,.74,.86]) translate([0,ring_r-8,174]) cube([36,24,8],center=true); // liquid pulse actuator
  color([.97,.60,.16]) translate([0,ring_r-8,216]) cube([36,24,8],center=true); // steady carrier path cue
  color([.10,.74,.86]) hull(){
    translate([0,ring_r-20,168]) sphere(d=7);
    translate([0,ring_r-36,140]) sphere(d=7);
  }
  color([.97,.60,.16]) hull(){
    translate([5,ring_r-20,218]) sphere(d=6);
    translate([5,ring_r-36,140]) sphere(d=6);
  }
  // Paired feed ends at a symbolic atomizer envelope, not an orifice design.
  color([.62,.70,.74]) translate([0,ring_r-38,140]) rotate([90,0,0]) cylinder(d=14,h=8,center=true);
  color([.10,.74,.86]) translate([0,ring_r-42,140]) sphere(d=5);
}

// Controller/logger box and four channel indicators, physically separate from the wet path.
color([.08,.14,.18]) translate([0,-ring_r-35,210]) cube([92,38,52],center=true);
color([.62,.70,.74]) translate([0,-ring_r-55,210]) cube([54,4,28],center=true);
for(i=[0:3]){
  color([.10,.74,.86]) translate([-28+i*18,-ring_r-58,211]) sphere(d=7);
  color([.97,.60,.16]) translate([-28+i*18,-ring_r-58,199]) sphere(d=4);
}
color([.97,.60,.16]) translate([0,-ring_r-57,225]) cube([30,3,2],center=true); // clock-sync cue

// Central surrogate and three diagnostic planes; no fire is represented.
color([.90,.80,.62]) translate([0,0,sample_h]) cube([24,24,142],center=true);
for(z=plane_z){
  color([.10,.74,.86,.5]) translate([0,0,z]) difference(){
    cylinder(r=ring_r-27,h=2,center=true);
    cylinder(r=ring_r-31,h=4,center=true);
    cylinder(r=23,h=4,center=true);
  }
  for(a=[0:45:315]) rotate([0,0,a])
    color([.97,.60,.16]) translate([ring_r-40,0,z]) cube([8,8,7],center=true);
}

// Removable isolated witnesses around the sample measure delivered water in cold runs.
for(a=[0:45:315]) rotate([0,0,a]){
  color([.08,.14,.18]) translate([0,ring_r-42,44]) cube([22,18,8],center=true);
  color([.10,.74,.86]) translate([0,ring_r-42,49]) difference(){
    cube([20,16,2],center=true);
    cube([15,11,3],center=true);
  }
}

// Bottom index rail indicates cassette removal and reinstallation datum.
color([.62,.70,.74]) translate([0,-ring_r-10,25]) cube([102,8,8],center=true);
color([.97,.60,.16]) translate([0,-ring_r-17,25]) cube([28,5,14],center=true);
