#!/usr/bin/env python
# (C) 2025 Jonas Zeihe, MIT License. Developer: Jonas Zeihe. Contact: JonasZeihe@gmail.com

import os
import subprocess
import datetime
import sys
import shutil
import platform


def resolve_npm_command():
    return "npm.cmd" if platform.system() == "Windows" else "npm"


def main():
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
    os.chdir(root)

    timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H-%M")
    logfile = f"01_start_log_{timestamp}.txt"

    with open(logfile, "w") as log:
        log.write("Starting App...\n")
        log.write("========================\n")
        log.write(f"{timestamp}\n")
        log.write("========================\n")

        npm_cmd = resolve_npm_command()

        if shutil.which(npm_cmd) is None:
            log.write("npm not found in PATH.\n")
            print("npm not found in PATH. Please install Node.js or add npm to PATH.")
            sys.exit(1)

        try:
            subprocess.run(
                [npm_cmd, "run", "dev"], check=True, stdout=log, stderr=log
            )
            log.write("App started successfully!\n")
            print("App started successfully!")
        except subprocess.CalledProcessError:
            log.write("Error occurred while starting the app.\n")
            print(
                f"Error occurred while starting the app. Check the log file: {logfile}"
            )
            sys.exit(1)


if __name__ == "__main__":
    main()
