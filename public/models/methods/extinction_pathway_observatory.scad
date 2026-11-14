// EXTINCTION-PATHWAY-MAP concept cell. Dimensions are illustrative mm only.
L=300; W=180; H=180; Z=H/2;
// Corner posts and top/bottom optical rails; windows are schematic.
for(x=[-L/2,L/2]) for(y=[-W/2,W/2]) color([.55,.68,.74]) translate([x,y,Z]) cube([8,8,H],center=true);
for(z=[0,H]){
 for(y=[-W/2,W/2]) color([.55,.68,.74]) translate([0,y,z]) cube([L,8,8],center=true);
 for(x=[-L/2,L/2]) color([.55,.68,.74]) translate([x,0,z]) cube([8,W,8],center=true);
}
for(y=[-W/2+4,W/2-4]) color([.12,.7,.82,.12]) translate([0,y,Z]) cube([L-20,2,H-20],center=true);
// Symbolic PMMA coupon, holder and paired surface/depth temperature witnesses.
color([.92,.79,.58]) translate([0,0,Z]) cube([58,24,5],center=true);
color([.55,.68,.74]) translate([0,0,32]) cube([10,10,62],center=true);
for(x=[-20,0,20]) for(z=[Z-2,Z+2]) color([1,.55,.14]) translate([x,0,z]) sphere(d=3);
// Orthogonal camera envelopes with optical axes crossing the sample.
for(y=[-W/2-22,W/2+22]){
 color([.55,.68,.74]) translate([0,y,Z]) cube([44,24,36],center=true);
 color([.08,.15,.2]) translate([0,y+sign(y)*18,Z]) rotate([90,0,0]) cylinder(d=20,h=10,center=true);
}
for(x=[-L/2-22,L/2+22]){
 color([.55,.68,.74]) translate([x,0,Z]) cube([24,44,36],center=true);
 color([.08,.15,.2]) translate([x+sign(x)*18,0,Z]) rotate([0,90,0]) cylinder(d=20,h=10,center=true);
}
// Independent gas inlet/exhaust trunks; no agent, pressure or flow chosen.
color([.55,.68,.74]) translate([-L/2-32,0,Z]) rotate([0,90,0]) cylinder(d=24,h=64,center=true);
color([.15,.72,.82]) translate([-L/2-68,0,Z]) rotate([0,90,0]) cylinder(d=14,h=12,center=true);
color([.55,.68,.74]) translate([L/2+32,0,Z]) rotate([0,90,0]) cylinder(d=24,h=64,center=true);
color([.08,.15,.2]) translate([L/2+72,0,Z]) cube([50,56,58],center=true);
// Schematic O2 / flow point probes on the near and far sides.
for(x=[-70,70]) for(y=[-34,34]){
 color([.15,.72,.82]) translate([x,y,Z+42]) cube([12,12,10],center=true);
 color([1,.55,.14]) translate([x,y,Z-42]) sphere(d=5);
}
color([.15,.72,.82]) translate([0,0,H+24]) cube([116,52,16],center=true);
