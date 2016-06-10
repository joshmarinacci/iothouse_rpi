#!/bin/bash
# /etc/init.d/iotmonitor.sh

### BEGIN INIT INFO
# Provides:          servoblaster
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Example initscript
# Description:       This service is used to manage a servo
### END INIT INFO


case "$1" in 
    start)
        echo "Starting iot monitor"
        nohup /usr/local/bin/node /home/pi/iothouse_rpi/monitor.js &
        ;;
    stop)
        echo "Stopping iot monitor"
        killall node
        ;;
    *)
        echo "Usage: /etc/init.d/monitor start|stop"
        exit 1
        ;;
esac

exit 0
