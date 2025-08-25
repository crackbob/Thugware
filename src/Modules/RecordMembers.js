let mediaRecorder = null;
let recordedChunks = [];

function startRecording(videoPlayer) {
    let canvas = videoPlayer.render.getCanvas();
    recordedChunks = [];
    const stream = canvas.captureStream(60);

    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = "meeting.webm";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    mediaRecorder.start();
}

function RecordMembers() {
    let mainSDKInstance = this;

    if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder = null;
    } else {
        let videoPanels = mainSDKInstance.scope.document.getElementsByTagName("video-player");
        if (videoPanels[0]) {
            startRecording(videoPanels[0]);
        }
    }
}

export default RecordMembers;
