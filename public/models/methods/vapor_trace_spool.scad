// VAPOR-TRACE: concept-only phase-resolved outlet measurement spool.
// All dimensions are illustrative mm; not a pressure-rated flow component.
$fn=56;
L=150; R=43;

// Transparent flow envelope with reinforced but open-access end flanges.
color([.12,.70,.82,.18]) rotate([0,90,0]) cylinder(d=2*R,h=L,center=true);
for(x=[-L/2,L/2]){
  color([.62,.70,.74]) translate([x,0,0]) rotate([0,90,0]) difference(){
    cylinder(d=116,h=8,center=true);
    cylinder(d=82,h=10,center=true);
  }
}
// Optical ports at inlet/outlet sampling planes.
for(x=[-48,48]){
  color([.08,.14,.18]) translate([x,0,49]) cube([36,32,18],center=true);
  color([.97,.60,.16]) translate([x,0,60]) cube([22,4,4],center=true);
  color([.10,.74,.86]) translate([x,-18,49]) cube([20,5,5],center=true);
  color([.62,.70,.74]) translate([x,18,49]) cube([20,5,5],center=true);
}
// Schematic annular inertial droplet interceptor and separate liquid collection cup.
color([.62,.70,.74]) translate([0,0,0]) rotate([0,90,0]) difference(){
  cylinder(d=72,h=5,center=true);
  cylinder(d=53,h=7,center=true);
}
for(a=[0:45:315]) rotate([a,0,0])
  color([.62,.70,.74]) translate([0,34,0]) cube([5,16,3],center=true);
color([.10,.74,.86]) translate([0,-51,-31]) difference(){
  cylinder(d=34,h=40,center=true);
  translate([0,0,2]) cylinder(d=28,h=39,center=true);
}
color([.08,.14,.18]) translate([0,-51,-53]) cylinder(d=38,h=5,center=true);
// Independent gas-phase measurement cell and calibration reference branch.
color([.08,.14,.18]) translate([10,64,12]) cube([94,26,42],center=true);
color([.97,.60,.16]) translate([10,64,12]) rotate([0,90,0]) cylinder(d=8,h=88,center=true);
color([.10,.74,.86]) translate([10,64,38]) cube([44,6,5],center=true);
color([.62,.70,.74]) for(x=[-22,22]) translate([10+x,80,12]) cube([6,6,22],center=true);
// Matched bypass/reference tube for sensor zero and response characterization.
color([.97,.60,.16]) hull(){
  translate([-48,60,14]) sphere(d=6);
  translate([-48,88,14]) sphere(d=6);
  translate([48,60,14]) sphere(d=6);
  translate([48,88,14]) sphere(d=6);
}
color([.08,.14,.18]) translate([0,101,18]) cube([82,24,34],center=true);
for(a=[0:90:270]) rotate([0,0,a])
  color([.10,.74,.86]) translate([22,101,38]) sphere(d=6);
// Rail-clamp datum and anti-rotation key (fixture interface only).
color([.62,.70,.74]) translate([0,0,-81]) cube([86,24,8],center=true);
color([.97,.60,.16]) translate([0,-17,-81]) cube([24,8,14],center=true);
