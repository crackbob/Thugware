import AutoRejoin from "./Modules/AutoRejoin";
import AutoUnmute from "./Modules/autoUnmute";
import BotMeeting from "./Modules/BotMeeting";
import ChatSpammer from "./Modules/ChatSpammer";
import HandSpammer from "./Modules/handSpammer";
import HideNotifications from "./Modules/HideNotifications";
import NameSpammer from "./Modules/nameSpammer";
import ReactionSpammer from "./Modules/reactionSpammer";
import RecordMembers from "./Modules/RecordMembers";
import SDK from "./SDK/SDK"
import Panel from "./UI/Panel"

let mainSDKInstance = new SDK(document.getElementById("webclient")?.contentWindow || window);

window.Thugware = mainSDKInstance;

window.spammerSpeed = 10;

let ThugwarePanel = new Panel("THUGWARE", false);
ThugwarePanel.addButton("Hand Spammer", HandSpammer.bind(mainSDKInstance));
ThugwarePanel.addButton("Name Spammer", NameSpammer.bind(mainSDKInstance));
ThugwarePanel.addButton("Reaction Spammer", ReactionSpammer.bind(mainSDKInstance));
ThugwarePanel.addButton("Auto Unmute", AutoUnmute.bind(mainSDKInstance));
ThugwarePanel.addButton("Chat Spammer", ChatSpammer.bind(mainSDKInstance));
ThugwarePanel.addButton("Auto Rejoin", AutoRejoin.bind(mainSDKInstance));
ThugwarePanel.addButton("Bot Meeting", BotMeeting.bind(mainSDKInstance));
ThugwarePanel.addButton("Hide Notifications", HideNotifications.bind(mainSDKInstance));
ThugwarePanel.addButton("Record Members", RecordMembers.bind(mainSDKInstance));
ThugwarePanel.addSlider("Spammer Delay", 0, 5000, window.spammerSpeed, (value) => window.spammerSpeed = value );