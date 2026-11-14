// HARBOR-PERIMETER-SCAN: detachable cold-flow sensor ring concept.
// Geometry only; probe positions, sensor type, mass and flight compatibility are unspecified.
$fn=32;
ring_r=175; ring_z=260;
// Four axial standoffs sit near the perimeter so they do not cross the test volume.
color([.30,.41,.47]) for(a=[0:90:270]) rotate([0,0,a])
  translate([ring_r-4,0,ring_z-24]) cube([8,8,118],center=true);
// Segmented annular rail leaves camera windows and indicates an indexed angular datum.
color([.62,.70,.74]) for(a=[0:10:350]) rotate([0,0,a])
  translate([ring_r,0,ring_z]) rotate([90,0,0]) cylinder(d=8,h=18,center=true);
// Eight radial witness pods at two axial planes. Colored ends are location marks only.
for(z=[ring_z-35,ring_z+35]) for(a=[0:45:315]) rotate([0,0,a]){
  color([.12,.70,.84]) translate([ring_r,0,z]) cube([22,16,12],center=true);
  color([.95,.60,.15]) translate([ring_r+13,0,z]) sphere(d=8);
  color([.08,.14,.18]) translate([ring_r+17,0,z]) sphere(d=4);
}
// Central plate and lugs removed to keep test volume clear.
// No laser beam, nozzle, suppressant, powered fan, or flame is represented.

