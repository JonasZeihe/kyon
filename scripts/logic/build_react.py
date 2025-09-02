#!/usr/bin/env python
# (C) 2025 Jonas Zeihe, MIT License. Developer: Jonas Zeihe. Contact: JonasZeihe@gmail.com

import os
import subprocess
import datetime
import sys


def main():
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
    os.chdir(root)

    timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H-%M")
    logfile = f"03_build_log_{timestamp}.txt"

    with open(logfile, "w", encoding="utf-8") as log:
        log.write("Starting Build Process...\n")
        log.write("========================\n")
        log.write(f"{timestamp}\n")
        log.write("========================\n")
        log.write("Running npm run build...\n")

        try:
            process = subprocess.Popen(
                ["npm", "run", "build"],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding="utf-8",
                shell=(os.name == "nt"),
            )
            for line in process.stdout:
                print(line, end="")  # Konsole
                log.write(line)  # Logfile
            process.wait()
            if process.returncode == 0:
                log.write("Build completed successfully!\n")
                print("Build completed successfully!")
            else:
                log.write("Build failed.\n")
                print(f"Build failed. Check the log file: {logfile}")
                sys.exit(1)
        except Exception as e:
            log.write(f"Build failed: {e}\n")
            print(f"Build failed: {e}. Check the log file: {logfile}")
            sys.exit(1)


if __name__ == "__main__":
    main()
