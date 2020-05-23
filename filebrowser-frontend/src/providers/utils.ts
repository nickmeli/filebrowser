

export class Utils {
    static convertBytes(bytes: number): string {
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

        if (bytes == 0) {
            return "0 B"
        }

        const i = Math.ceil(Math.floor(Math.log(bytes) / Math.log(1024)))

        if (i == 0) {
            return bytes + " " + sizes[i]
        }

        return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
    }

    static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}