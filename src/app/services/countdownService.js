export function getTimeRemaining(dateString)
{
    const now = Date.now();
    const target = new Date(dateString).getTime();
    const diff = target - now;

    if (diff <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    done: false,
    days: pad(Math.floor(diff / (1000 * 60 * 60 * 24))),
    hours: pad(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    minutes: pad(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))),
    seconds: pad(Math.floor((diff % (1000 * 60)) / 1000))
  };
}

function pad(num)
{
    return String(num).padStart(2, "0");
}