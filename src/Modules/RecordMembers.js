import Panel from "../UI/Panel";

let currentRecordings = {};
let membersPanel;

function recordMember (index, videoPlayer, memberName) {
    let canvas = videoPlayer.render.getCanvas();
    let mediaRecorder;
    let recordedChunks = [];

    if (currentRecordings[index]) {
        currentRecordings[index].stop();
        delete currentRecordings[index];
    }

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
        a.download = memberName + ".webm";
        a.click();
    };

    currentRecordings[index] = mediaRecorder;
    mediaRecorder.start();
}

function RecordMembers () {
    let mainSDKInstance = this;

    if (!membersPanel) {
        membersPanel = new Panel("Members", false);
    } else {
        membersPanel.panel.remove();
        membersPanel = null;
        return;
    }
    
    let memberVideos = {};
    let videoPanels = mainSDKInstance.scope.document.getElementsByTagName("video-player");
    Object.values(videoPanels).forEach((element) => {
        memberVideos[element.parentElement.lastChild.firstChild.innerText] = element;
    });

    Object.keys(memberVideos).forEach((memberName, index) => membersPanel.addButton(memberName, () => recordMember(index, memberVideos[memberName], memberName)));
}

export default RecordMembers;