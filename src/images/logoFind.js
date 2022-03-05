import adobeLogo from "./adobe.png";
import aliexpressLogo from "./aliexpress.png";
import amazonLogo from "./amazon.png";
import appstoreLogo from "./appstore.png";
import battlenetLogo from "./battlenet.png";
import beinconnectLogo from "./beinconnect.png";
import biletinialLogo from "./biletinial.jpg";
import binanceLogo from "./binance.png";
import bitbucketLogo from "./bitbucket.png";
import blutvLogo from "./blutv.jpg";
import clubhouseLogo from "./clubhouse.png";
import deezerLogo from "./deezer.jpg";
import defaultLogo from "./default.png";
import discordLogo from "./discord.png";
import disneyLogo from "./disney.png";
import dropboxLogo from "./dropbox.png";
import ebayLogo from "./ebay.png";
import egeLogo from "./ege.png"
import epicgamesLogo from "./epicgames.png";
import evernoteLogo from "./evernote.png";
import facebookLogo from "./facebook.png";
import githubLogo from "./github.png";
import gitlabLogo from "./gitlab.png";
import gittigidiyorLogo from "./gittigidiyor.jpg";
import gmailLogo from "./gmail.png";
import googleLogo from "./google.jpg";
import hboLogo from "./hbo.png";
import hepsiburadaLogo from "./hepsiburada.png";
import huluLogo from "./hulu.png";
import icloudLogo from "./icloud.png";
import instagramLogo from "./instagram.png";
import itunesLogo from "./itunes.png";
import linkedinLogo from "./linkedin.png";
import mediumLogo from "./medium.png";
import mhrsLogo from "./mhrs.jpg";
import miLogo from "./mi.png";
import microsoftLogo from "./microsoft.png";
import mubiLogo from "./mubi.jpg";
import myspaceLogo from "./myspace.png";
import n11Logo from "./n11.png";
import netflixLogo from "./netflix.jpg";
import nintendoLogo from "./nintendo.png";
import obiletLogo from "./obilet.jpg";
import okLogo from "./ok.png";
import onedriveLogo from "./onedrive.png";
import originLogo from "./origin.png";
import outlookLogo from "./outlook.png";
import patreonLogo from "./patreon.png";
import paypalLogo from "./paypal.png";
import pinterestLogo from "./pinterest.png";
import puhutvLogo from "./puhutv.jpg";
import quoraLogo from "./quora.png";
import redditLogo from "./reddit.png";
import shazamLogo from "./shazam.png";
import skypeLogo from "./skype.png";
import slackLogo from "./slack.png";
import snapchatLogo from "./snapchat.png";
import soundcloudLogo from "./soundcloud.png";
import spotifyLogo from "./spotify.png";
import stackoverflowLogo from "./stackoverflow.png";
import steamLogo from "./steam.png";
import sunexpressLogo from "./sunexpress.jpg";
import teamsLogo from "./teams.png";
import tiktokLogo from "./tiktok.png";
import tinderLogo from "./tinder.png";
import trelloLogo from "./trello.png";
import trendyolLogo from "./trendyol.jpg";
import tumblrLogo from "./tumblr.png";
import turkiyeLogo from "./turkiye.png";
import turnaLogo from "./turna.jpg"
import twitchLogo from "./twitch.png";
import twitterLogo from "./twitter.png";
import uberLogo from "./uber.png";
import ucuzabiletLogo from "./ucuzabilet.png";
import udemyLogo from "./udemy.png";
import uplayLogo from "./uplay.png";
import viberLogo from "./viber.png";
import vkLogo from "./vk.png";
import wifiLogo from "./wifi.png";
import xboxLogo from "./xbox.png";
import yahooLogo from "./yahoo.png";
import yemeksepetiLogo from "./yemeksepeti.jpg";
import youtubeLogo from "./youtube.png";
import zoomLogo from "./zoom.png";

const logoFind = text => {
    if (text.includes("adobe")) {
        return adobeLogo;
    } else if (text.includes("aliexpress")) {
        return aliexpressLogo;
    } else if (text.includes("amazon")) {
        return amazonLogo;
    } else if (text.includes("appstore")) {
        return appstoreLogo;
    } else if (text.includes("battlenet")) {
        return battlenetLogo;
    } else if (text.includes("beinconnect")) {
        return beinconnectLogo;
    } else if (text.includes("biletinial")) {
        return biletinialLogo;
    } else if (text.includes("binance")) {
        return binanceLogo;
    } else if (text.includes("bitbucket")) {
        return bitbucketLogo;
    } else if (text.includes("blutv")) {
        return blutvLogo;
    } else if (text.includes("clubhouse")) {
        return clubhouseLogo;
    } else if (text.includes("deezer")) {
        return deezerLogo;
    } else if (text.includes("discord")) {
        return discordLogo;
    } else if (text.includes("disney")) {
        return disneyLogo;
    } else if (text.includes("dropbox")) {
        return dropboxLogo;
    } else if (text.includes("ebay")) {
        return ebayLogo;
    } else if (text.includes("epicgames")) {
        return epicgamesLogo;
    } else if (text.includes("evernote")) {
        return evernoteLogo;
    } else if (text.includes("facebook")) {
        return facebookLogo;
    } else if (text.includes("github")) {
        return githubLogo;
    } else if (text.includes("gitlab")) {
        return gitlabLogo;
    } else if (text.includes("gittigidiyor")) {
        return gittigidiyorLogo;
    } else if (text.includes("gmail")) {
        return gmailLogo;
    } else if (text.includes("google")) {
        return googleLogo;
    } else if (text.includes("hbo")) {
        return hboLogo;
    } else if (text.includes("hepsiburada")) {
        return hepsiburadaLogo;
    } else if (text.includes("hulu")) {
        return huluLogo;
    } else if (text.includes("icloud")) {
        return icloudLogo;
    } else if (text.includes("instagram")) {
        return instagramLogo;
    } else if (text.includes("itunes")) {
        return itunesLogo;
    } else if (text.includes("linkedin")) {
        return linkedinLogo;
    } else if (text.includes("medium")) {
        return mediumLogo;
    } else if (text.includes("mhrs")) {
        return mhrsLogo;
    } else if (text.includes("microsoft")) {
        return microsoftLogo;
    } else if (text.includes("myspace")) {
        return myspaceLogo;
    } else if (text.includes("n11")) {
        return n11Logo;
    } else if (text.includes("netflix")) {
        return netflixLogo;
    } else if (text.includes("nintendo")) {
        return nintendoLogo;
    } else if (text.includes("obilet")) {
        return obiletLogo;
    } else if (text.includes("onedrive")) {
        return onedriveLogo;
    } else if (text.includes("outlook") || text.includes("bilgeadam")) {
        return outlookLogo;
    } else if (text.includes("patreon")) {
        return patreonLogo;
    } else if (text.includes("paypal")) {
        return paypalLogo;
    } else if (text.includes("pinterest")) {
        return pinterestLogo;
    } else if (text.includes("puhutv")) {
        return puhutvLogo;
    } else if (text.includes("quora")) {
        return quoraLogo;
    } else if (text.includes("reddit")) {
        return redditLogo;
    } else if (text.includes("shazam")) {
        return shazamLogo;
    } else if (text.includes("skype")) {
        return skypeLogo;
    } else if (text.includes("slack")) {
        return slackLogo;
    } else if (text.includes("snapchat")) {
        return snapchatLogo;
    } else if (text.includes("soundcloud")) {
        return soundcloudLogo;
    } else if (text.includes("spotify")) {
        return spotifyLogo;
    } else if (text.includes("stackoverflow")) {
        return stackoverflowLogo;
    } else if (text.includes("steam")) {
        return steamLogo;
    } else if (text.includes("sunexpress")) {
        return sunexpressLogo;
    } else if (text.includes("tiktok")) {
        return tiktokLogo;
    } else if (text.includes("tinder")) {
        return tinderLogo;
    } else if (text.includes("trello")) {
        return trelloLogo;
    } else if (text.includes("trendyol")) {
        return trendyolLogo;
    } else if (text.includes("tumblr")) {
        return tumblrLogo;
    } else if (text.includes("turkiye") || text.includes("devlet")) {
        return turkiyeLogo;
    } else if (text.includes("turna")) {
        return turnaLogo;
    } else if (text.includes("twitch")) {
        return twitchLogo;
    } else if (text.includes("twitter")) {
        return twitterLogo;
    } else if (text.includes("viber")) {
        return viberLogo;
    } else if (text.includes("yahoo")) {
        return yahooLogo;
    } else if (text.includes("yemeksepeti")) {
        return yemeksepetiLogo;
    } else if (text.includes("youtube")) {
        return youtubeLogo;
    } else if (text.includes("zoom")) {
        return zoomLogo;
    } else if (text.includes("xbox")) {
        return xboxLogo;
    } else if (text.includes("wifi")) {
        return wifiLogo;
    } else if (text.includes("vk")) {
        return vkLogo;
    } else if (text.includes("uplay")) {
        return uplayLogo;
    } else if (text.includes("uber")) {
        return uberLogo;
    } else if (text.includes("ucuzabilet")) {
        return ucuzabiletLogo;
    } else if (text.includes("udemy")) {
        return udemyLogo;
    } else if (text.includes("teams")) {
        return teamsLogo;
    } else if (text.includes("origin")) {
        return originLogo;
    } else if (text.includes("ok.ru")) {
        return okLogo;
    } else if (text.includes("mubi")) {
        return mubiLogo;
    } else if (text.includes("xiaomi")) {
        return miLogo;
    } else if (text.includes("ege")) {
        return egeLogo;
    } else {
        return defaultLogo;
    }
}

export default logoFind;