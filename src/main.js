import AutoRejoin from "./Modules/AutoRejoin";
import AutoUnmute from "./Modules/autoUnmute";
import BotMeeting from "./Modules/BotMeeting";
import ChatSpammer from "./Modules/ChatSpammer";
import HandSpammer from "./Modules/handSpammer";
import HideNotifications from "./Modules/HideNotifications";
import NameSpammer from "./Modules/nameSpammer";
import ReactionSpammer from "./Modules/reactionSpammer";
import SDK from "./SDK/SDK"
import Panel from "./UI/Panel"

let mainSDKInstance = new SDK(document.getElementById("webclient")?.contentWindow || window);

window.Boom = mainSDKInstance;

let boomPanel = new Panel("Boom");
boomPanel.addButton("Hand Spammer", HandSpammer.bind(mainSDKInstance));
boomPanel.addButton("Name Spammer", NameSpammer.bind(mainSDKInstance));
boomPanel.addButton("Reaction Spammer", ReactionSpammer.bind(mainSDKInstance));
boomPanel.addButton("Auto Unmute", AutoUnmute.bind(mainSDKInstance));
boomPanel.addButton("Chat Spammer", ChatSpammer.bind(mainSDKInstance));
boomPanel.addButton("Auto Rejoin", AutoRejoin.bind(mainSDKInstance));
boomPanel.addButton("Bot Meeting", BotMeeting.bind(mainSDKInstance));
boomPanel.addButton("Hide Notifications", HideNotifications.bind(mainSDKInstance));