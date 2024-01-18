# Network Tables Spoofer

This is a simple example robot program that sends out dummy Network Tables data.

Make sure you have robotpy installed, and then run

```
py -m robotpy sim
```

while inside of the `ntspoofer` folder. This should launch the sim.

In its current state, the robot will just start at `(0, 0)`, and then move slowly
when in teleop mode. This is enough to test basic rendering of robot position
within Copper Console.
