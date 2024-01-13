# import pygame
import ntcore
import time

def ntcore_test(hostname: str):
    inst = ntcore.NetworkTableInstance.getDefault()
    table = inst.getTable("SmartDashboard")
    # xSub = table.getDoubleTopic("x").subscribe(0)
    # ySub = table.getDoubleTopic("y").subscribe(0)
    #timestampSub = table.getNumber("meep morp", 69).subscribe(0)
    timestampSub = table.getIntegerTopic("meep morp").subscribe(-1)
    inst.startClient4("Copper Console")
    # inst.setServerTeam(team) # where TEAM=190, 294, etc, or use inst.setServer("hostname") or similar
    inst.setServer(hostname)
    # inst.startDSClient() # recommended if running on DS computer; this gets the robot IP from the DS

    while True:
        time.sleep(1)

        # x = xSub.get()
        # y = ySub.get()
        # print(f"X: {x} Y: {y}")
        timestamp = timestampSub.get()
        print(f"timestamp: {timestamp}")

def main():
    print("Copper Console")
    ntcore_test("10.4.1.2")

if __name__ == "__main__":
    main()