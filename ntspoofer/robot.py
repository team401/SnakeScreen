import ntcore
import wpilib
import math


class EasyNetworkTableExample(wpilib.TimedRobot):
    def robotInit(self) -> None:
        # Get the default instance of NetworkTables that was created automatically
        # when the robot program starts
        inst = ntcore.NetworkTableInstance.getDefault()

        # Get the table within that instance that contains the data. There can
        # be as many tables as you like and exist to make it easier to organize
        # your data. In this case, it's a table called datatable.
        table = inst.getTable("CopperConsole")

        # Start publishing topics within that table that correspond to the X and Y values
        # for some operation in your program.
        # The topic names are actually "/datatable/x" and "/datatable/y".
        self.robotPoseSub = table.getDoubleArrayTopic("robotPose").publish()
        # self.xPub = table.getDoubleTopic("x").publish()
        # self.yPub = table.getDoubleTopic("y").publish()
        # self.xPub.set(0)
        # self.yPub.set(0)

        self.x: float = 0
        self.y: float = 0
        self.rotation: float = 0

        self.joystick = wpilib.Joystick(0)

        self.updatePoseTable()

    def updatePoseTable(self):
        self.robotPoseSub.set([self.x, self.y, self.rotation])

    def autonomousPeriodic(self) -> None:
        # Publish values that are constantly increasing.
        self.x += 0.1
        self.y += 0.2
        self.rotation += 0.05
        self.x %= 5
        self.y %= 5

        self.updatePoseTable()
    
    def teleopPeriodic(self) -> None:
        # let us move around with a joystick
        moveX = self.joystick.getX();
        moveY = self.joystick.getY();
        # up vector 
        rotatedX = math.cos(moveX) - math.sin(moveY)
        rotatedY = math.sin(moveX) + math.cos(moveY)
        self.x += moveX / 10
        self.y -= moveY / 10

        rotation = self.joystick.getTwist()
        self.rotation += rotation / 10

        self.updatePoseTable()


if __name__ == "__main__":
    wpilib.run(EasyNetworkTableExample)
