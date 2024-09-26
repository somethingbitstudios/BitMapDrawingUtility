// triangleFillerWorker.js

self.onmessage = function (event) {
    console.log("Worker received data:", event.data);
    const { pt1, pt2, pt3, color } = event.data;

    function setPixel(x, y, color) {
        // Send pixel data back to the main thread
        self.postMessage({ x, y, color });
    }

    // Ensure points are valid before proceeding
    if (!pt1 || !pt2 || !pt3) {
        throw new Error("Invalid points provided to worker.");
    }

    // Sort points by y-coordinate
    const points = [pt1, pt2, pt3].sort((a, b) => a.y - b.y);
    const [p1, p2, p3] = points;

    const total_height = p3.y - p1.y;
    for (let y = p1.y; y <= p3.y; y++) {
        const is_left = y < p2.y || total_height === 0;
        const segment_height = is_left ? p2.y - p1.y : p3.y - p2.y;
        const alpha = (y - p1.y) / total_height;
        const beta = (y - (is_left ? p1.y : p2.y)) / segment_height;

        const x1 = Math.round(p1.x + (p3.x - p1.x) * alpha);
        const x2 = is_left
            ? Math.round(p1.x + (p2.x - p1.x) * alpha)
            : Math.round(p2.x + (p3.x - p2.x) * beta);

        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            setPixel(x, y, color);
        }
    }
};

// Error handling
self.onerror = function (error) {
    console.error("Worker error:", error.message);
};
