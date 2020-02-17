export const parseBbCode = (content) => {

    let regex = {
        '<span style="color:$1">$2</span>'                                                  :   /\[color=(.|[\s\S]*?)\](.*?)\[\/color\]/gi,
        '<span style="font-size:$1">$2</span>'                                              :   /\[size=(.|[\s\S]*?)\](.*?)\[\/size\]/gi,
        '<span style="font-family:$1">$2</span>'                                            :   /\[font=(.|[\s\S]*?)\](.*?)\[\/font\]/gi,
        '<div style="text-align:$1">$2</div>'                                               :   /\[align=(.|[\s\S]*?)\](.*?)\[\/align\]/gi,
        '<span style="font-weight:bold">$1</span>'                                          :   /\[b\](.|[\s\S]*?)\[\/b\]/gi,
        '<span style="font-style:italic; vertical-align:top;">$1</span>'                    :   /\[i\](.|[\s\S]*?)\[\/i\]/gi,
        '<span style="text-decoration:underline">$1</span>'                                 :   /\[u\](.|[\s\S]*?)\[\/u\]/gi,
        '<span style="text-decoration:line-through">$1</span>'                              :   /\[s\](.|[\s\S]*?)\[\/s\]/gi,
        '<strike>$1</strike>'                                                               :   /\[s\](.|[\s\S]*?)\[\/s\]/gi,
        '<sub>$1</sub>'                                                                     :   /\[sub\](.|[\s\S]*?)\[\/sub\]/gi,
        '<sup>$1</sup>'                                                                     :   /\[sup\](.|[\s\S]*?)\[\/sup\]/gi,
        '<div style="text-align:center">$1</div>'                                           :   /\[center\](.|[\s\S]*?)\[\/center\]/gi,

        // [Code] and [PHP]
        '<div class="bb-code">$1</div>'                                                     :   /\[code\](.|[\s\S]*?)\[\/code\]/gi,
        '<div class="bb-php">$1</div>'                                                      :   /\[php\](.|[\s\S]*?)\[\/php\]/gi,

        // [Topic]
        '<span class="bb-topic">$1</span>'                                                  :   /\[topic\](.*?)\[\/topic\]/gi,

        // [email]
        '<a href="mailto:$1" class="bb-email">$1</a>'                                       :   /\[email\](.*?)\[\/email\]/gi,
        '<a href="mailto:$1" class="bb-email">$2</a>'                                       :   /\[email=(.*?)\](.*?)\[\/email\]/gi,

        // [url]
        '<a href="http://www.$1" target="_blank" class="bb-url">$1</a>'                     :   /\[url\]www\.(.*?)\[\/url\]/gi,
        '<a href="$1" class="bb-url">$1</a>'                                                :   /\[url\](.*?)\[\/url\]/gi,
        '<a href="$1" class="bb-url">$2</a>'                                                :   /\[url=(.*?)?\](.*?)\[\/url\]/gi,

        // [img]
        '<div class="bb-image-container"><a href="$1"><img src="$1" alt="$1" class="bb-image"/></a></div>'                            :       /\[img\](.*?)\[\/img\]/gi,
        '<div class="bb-image-container"><a href="$3"><img width="$1" height="$2" src="$3" alt="$3" class="bb-image"/></a></div>'     :       /\[img=(.*?)x(.*?)\](.*?)\[\/img\]/gi,

        // [flag]
        '<span class="flag-icon flag-icon-$1"></span>'                                      :   /\[flag=(\w+?)\]/gi,

        // [quote]
        '<div class="bb-quote-header">Quote:</div><div class="bb-quote">$1</div>'           :   /\[quote?\](.|[\s\S]*?)\[\/quote\]/gi,
        '<div class="bb-quote-header">$1 wrote:</div><div class="bb-quote">$2</div>'        :   /\[quote?=(?:&quot;|"|\')?(.*?)["\']?(?:&quot;|"|\')?\](.|[\s\S]*?)\[\/quote\]/gi,

        // [wiki]
        '<a href="https://wiki.quakeworld.nu/wiki/$1" title="Link to $1 wiki article">$2</a>'     :   /\[wiki=(.+?)\](.+?)\[\/wiki\]/gi,

        // [list]
        '<li class="bb-listitem">$1</li>'                                                   :   /\[\*\](.*?)(?:\s*)(?=\[\*\]|(?:\s*)?\[\/?list\])/gi,
        '</ul>'                                                                             :   /\[\/list\]/gi,
        //'</ul>'                                                                             :   /\[\/list:u(:\w+)?\]/gi,
        //'</ol>'                                                                             :   /\[\/list:o(:\w+)?\]/gi,
        '<ul class="bb-list-unordered">'                                                    :   /\[list\]\s*/gi,
        //'<ul class="bb-list-unordered">'                                                    :   /\[list:u(:\w+)?\]\s*/gi,
        //'<ol class="bb-list-ordered">'                                                      :   /\[list:o(:\w+)?\]\s*/gi,
        //'<ol class="bb-list-ordered,bb-list-ordered-d">'                                    :   /\[list(?::o)?(:\w+)?=1\]\s*/gi,
        //'<ol class="bb-list-ordered,bb-list-ordered-lr">'                                   :   /\[list(?::o)?(:\w+)?=i\]\s*/gi,
        //'<ol class="bb-list-ordered,bb-list-ordered-ur">'                                   :   /\[list(?::o)?(:\w+)?=I\]\s*/gi,
        //'<ol class="bb-list-ordered,bb-list-ordered-la">'                                   :   /\[list(?::o)?(:\w+)?=a\]\s*/gi,
        //'<ol class="bb-list-ordered,bb-list-ordered-ua">'                                   :   /\[list(?::o)?(:\w+)?=A\]\s*/gi,

        '<br/>'                                                                             :   /\n/g,
    };

    if (content) {
        for (let key in regex) {
            if (regex.hasOwnProperty(key)) {
                content = content.replace(regex[key], key);
            }
        }
    }

    return content;
}

export default parseBbCode;
