from datetime import datetime, timezone
from secrets import randbelow
from threading import Lock

_reference_lock = Lock()
_last_tick = ""
_sequence = 0


def generate_project_reference(now=None):
    """Create a sortable, collision-resistant reference for stateless deployments."""
    global _last_tick, _sequence

    current = now or datetime.now(timezone.utc)
    tick = current.strftime("%m%d%H%M%S%f")[:16]

    with _reference_lock:
        if tick == _last_tick:
            _sequence = (_sequence + 1) % 10_000
        else:
            _last_tick = tick
            _sequence = randbelow(10_000)

        suffix = f"{_sequence:04d}"

    return f"CGM/PVS/{current.year}/{tick}{suffix}"
