#!/bin/bash
# Watchdog — restarts the Next.js dev server whenever it exits.
cd /home/z/my-project
while true; do
  echo "[watchdog $(date +%T)] starting dev server..." >> dev.log
  bun run dev >> dev.log 2>&1
  EXIT_CODE=$?
  echo "[watchdog $(date +%T)] dev server exited (code $EXIT_CODE), restarting in 2s..." >> dev.log
  sleep 2
done
