from .models import ErrorLog
from datetime import datetime

def write_router_logs(username, host, port, function, status, message):
    log_entry = ErrorLog(
        level=status,  # "Success" or "Failure"
        message=message,
        function=function,
        timestamp=datetime.now(),
    )
    log_entry.save()
