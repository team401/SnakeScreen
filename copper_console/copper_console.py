import pygame
import ntcore
import os
import sys

HOSTNAME = "10.4.1.2"

def main():
    print("Copper Console")

    # pygame initialization
    pygame.init()
    screen = pygame.display.set_mode((640, 480))
    image = pygame.image.load(os.path.join(".", "field.png")).convert()
    image_scaled = pygame.transform.scale(image, (image.get_width() // 3, image.get_height()  // 3))
    pygame.display.set_mode((image_scaled.get_width(), image_scaled.get_height() + 100))
    pygame.display.set_caption("Copper Console")
    font = pygame.font.SysFont("monospace", 20)
    clock = pygame.time.Clock()

    # Network tables initialization
    inst = ntcore.NetworkTableInstance.getDefault()
    table = inst.getTable("SmartDashboard")

    timestampSub = table.getIntegerTopic("meep morp").subscribe(-1)
    timestamp: float = -1
    inst.startClient4("Copper Console")
    # inst.setServerTeam(team) # where TEAM=190, 294, etc, or use inst.setServer("hostname") or similar
    inst.setServer(HOSTNAME)
    # inst.startDSClient() # recommended if running on DS computer; this gets the robot IP from the DS

    running: bool = True
    time_since_poll: float = 0
    while running:
        time_since_poll += clock.get_time()

        if time_since_poll >= 20:
            timestamp = timestampSub.get()
            # print(f"timestamp: {timestamp}")

        screen.fill("purple")
        screen.blit(image_scaled, (0, 0))
        screen.blit(font.render(f"Timestamp: {timestamp}", True, "black"), (10, image_scaled.get_height() + 10))
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        pygame.display.flip()
        clock.tick(60)

if __name__ == "__main__":
    main()