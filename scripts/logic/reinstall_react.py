#!/usr/bin/env python
# (C) 2025 Jonas Zeihe, MIT License. Developer: Jonas Zeihe. Contact: JonasZeihe@gmail.com

import os
import subprocess
import datetime
import sys
import shutil


def delete_path(path, log):
    if os.path.isdir(path):
        log.write(f"Deleting directory {path}...\n")
        try:
            shutil.rmtree(path)
            log.write(f"{path} directory deleted successfully.\n")
        except Exception as e:
            log.write(f"Failed to delete {path} directory: {e}\n")
            print(f"Failed to delete {path} directory. Check the log file.")
            sys.exit(1)
    elif os.path.isfile(path):
        log.write(f"Deleting file {path}...\n")
        try:
            os.remove(path)
            log.write(f"{path} deleted successfully.\n")
        except Exception as e:
            log.write(f"Failed to delete {path}: {e}\n")
            print(f"Failed to delete {path}. Check the log file.")
            sys.exit(1)
    else:
        log.write(f"{path} does not exist. Skipping.\n")


def main():
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
    os.chdir(root)

    timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H-%M")
    logfile = f"02_clean_install_log_{timestamp}.txt"

    with open(logfile, "w") as log:
        log.write("Starting full reset...\n")
        log.write("========================\n")
        log.write(f"{timestamp}\n")
        log.write("========================\n")

        def run_or_log_error(cmd, desc):
            try:
                subprocess.run(
                    cmd, check=True, stdout=log, stderr=log, shell=(os.name == "nt")
                )
                log.write(f"{desc} completed successfully.\n")
            except subprocess.CalledProcessError:
                log.write(f"Failed to {desc.lower()}.\n")
                print(f"Failed to {desc.lower()}. Check the log file: {logfile}")
                sys.exit(1)

        delete_path("node_modules", log)
        delete_path("package-lock.json", log)
        delete_path("build", log)

        log.write("Running npm install...\n")
        run_or_log_error(["npm", "install"], "npm install")

        log.write(
            f"Full reset process completed successfully! Check the log file: {logfile}\n"
        )
        print(
            f"Full reset process completed successfully! Check the log file: {logfile}"
        )


if __name__ == "__main__":
    main()
