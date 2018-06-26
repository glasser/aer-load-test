#!/bin/bash

RATE=$1

echo 'POST http://localhost:4000/' |
  vegeta attack \
         -body query.json \
         -header 'content-type: application/json' \
         -rate "$RATE" |
  tee results.bin |
  vegeta report
