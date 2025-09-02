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
    logfile = f"04_test_log_{timestamp}.txt"

    env = os.environ.copy()
    env["CI"] = "true"

    with open(logfile, "w") as log:
        log.write("Running tests...\n")
        log.write("========================\n")
        log.write(f"{timestamp}\n")
        log.write("========================\n")

        try:
            subprocess.run(["npm", "test"], check=True, stdout=log, stderr=log, env=env)
            log.write("Tests passed successfully.\n")
            print("Tests passed successfully.")
        except subprocess.CalledProcessError:
            log.write("Tests failed.\n")
            print(f"Tests failed. See the log file: {logfile}")
            sys.exit(1)


if __name__ == "__main__":
    main()
