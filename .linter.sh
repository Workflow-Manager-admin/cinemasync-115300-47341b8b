#!/bin/bash
cd /home/kavia/workspace/code-generation/cinemasync-115300-47341b8b/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

