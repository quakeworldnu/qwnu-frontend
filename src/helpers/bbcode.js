export const parseBbCode = (content) => {

    let regex = {
        '<span style="color:$1">$2</span>'                                                  :   /\[color(?::\w+)?=(.|[\s\S]*?)\](.*?)\[\/color(?::\w+)?\]/gi,
        '<span style="font-size:$1">$2</span>'                                              :   /\[size(?::\w+)?=(.|[\s\S]*?)\](.*?)\[\/size(?::\w+)?\]/gi,
        '<span style="font-family:$1">$2</span>'                                            :   /\[font(?::\w+)?=(.|[\s\S]*?)\](.*?)\[\/font(?::\w+)?\]/gi,
        '<div style="text-align:$1">$2</div>'                                               :   /\[align(?::\w+)?=(.|[\s\S]*?)\](.*?)\[\/align(?::\w+)?\]/gi,
        '<span style="font-weight:bold">$1</span>'                                          :   /\[b(?::\w+)?\](.|[\s\S]*?)\[\/b(?::\w+)?\]/gi,
        '<span style="font-style:italic; vertical-align:top;">$1</span>'                    :   /\[i(?::\w+)?\](.|[\s\S]*?)\[\/i(?::\w+)?\]/gi,
        '<span style="text-decoration:underline">$1</span>'                                 :   /\[u(?::\w+)?\](.|[\s\S]*?)\[\/u(?::\w+)?\]/gi,
        '<span style="text-decoration:line-through">$1</span>'                              :   /\[s(?::\w+)?\](.|[\s\S]*?)\[\/s(?::\w+)?\]/gi,
        '<strike>$1</strike>'                                                               :   /\[s(?::\w+)?\](.|[\s\S]*?)\[\/s(?::\w+)?\]/gi,
        '<sub>$1</sub>'                                                                     :   /\[sub(?::\w+)?\](.|[\s\S]*?)\[\/sub(?::\w+)?\]/gi,
        '<sup>$1</sup>'                                                                     :   /\[sup(?::\w+)?\](.|[\s\S]*?)\[\/sup(?::\w+)?\]/gi,
        '<div style="text-align:center">$1</div>'                                           :   /\[center(?::\w+)?\](.|[\s\S]*?)\[\/center(?::\w+)?\]/gi,

        // [Code] and [PHP]
        '<div class="bb-code">$1</div>'                                                     :   /\[code(?::\w+)?\](.|[\s\S]*?)\[\/code(?::\w+)?\]/gi,
        '<div class="bb-php">$1</div>'                                                      :   /\[php(?::\w+)?\](.|[\s\S]*?)\[\/php(?::\w+)?\]/gi,

        // [Topic]
        '<span class="txt_topic">$1</span>'                                                 :   /\[topic(?::\w+)?\](.*?)\[\/topic(?::\w+)?\]/gi,

        // [email]
        '<a href="mailto:$1" class="bb-email">$1</a>'                                       :   /\[email(?::\w+)?\](.*?)\[\/email(?::\w+)?\]/gi,
        '<a href="mailto:$1" class="bb-email">$2</a>'                                       :   /\[email(?::\w+)?=(.*?)\](.*?)\[\/email(?::\w+)?\]/gi,

        // [url]
        '<a href="http://www.$1" target="_blank" class="bb-url">$1</a>'                     :   /\[url(?::\w+)?\]www\.(.*?)\[\/url(?::\w+)?\]/gi,
        '<a href="$1" class="bb-url">$1</a>'                                                :   /\[url(?::\w+)?\](.*?)\[\/url(?::\w+)?\]/gi,
        '<a href="$1" class="bb-url">$2</a>'                                                :   /\[url(?::\w+)?=(.*?)?\](.*?)\[\/url(?::\w+)?\]/gi,

        // [img]
        /*
        '/(?<!\\\\)\[img(?::\w+)?\](.*?)\[\/img(?::\w+)?\]/si'                                        => "<div style=\"padding-top:5px;\">".str_replace("\r", "", str_replace("\n", "", RenderHTML::FrameStart("", "", "", "")."<div style=\"padding:4px;\"><a href=\"\\1\"><img src=\"\\1\" alt=\"\\1\" class=\"bb-image\" /></a></div>".RenderHTML::FrameEnd()))."</div>",
        '/(?<!\\\\)\[img(?::\w+)?=(.*?)x(.*?)\](.*?)\[\/img(?::\w+)?\]/si'                            => "<div style=\"padding-top:5px;\">".str_replace("\r", "", str_replace("\n", "", RenderHTML::FrameStart("", "", "", "")."<div style=\"padding:4px;\"><a href=\"\\3\"><img width=\"\\1\" height=\"\\2\" src=\"\\3\" alt=\"\\3\" class=\"bb-image\" /></a></div>".RenderHTML::FrameEnd()))."</div>",
        */

        // [flag]
        '<span class="flag-icon flag-icon-$1"></span>'                                      :   /\[flag=(\w+?)\]/gi,

        // [quote]
        '<div class="bb-quote-header">Quote:</div><div class="bb-quote">$1</div>'           :   /\[quote(?::\w+)?\](.|[\s\S]*?)\[\/quote(?::\w+)?\]/gi,
        '<div class="bb-quote-header">$1 wrote:</div><div class="bb-quote">$2</div>'        :   /\[quote(?::\w+)?=(?:&quot;|"|\')?(.*?)["\']?(?:&quot;|"|\')?\](.|[\s\S]*?)\[\/quote\]/gi,

        // [wiki]
        '<a href="http://wiki.quakeworld.nu/$1" title="Link to $1 wiki article">$2</a>'     :   /\[wiki=(.+?)\](.+?)\[\/wiki\]/gi,

        // [list]
        '<li class="bb-listitem">$1</li>'                                                   :   /\[\*(?::\w+)?\](.*?)(?=(?:\s*)?\[\*|(?:\s*)?\[\/?list)/gi,
        '</ul>'                                                                             :   /\[\/list(:(?!u|o)\w+)?\]/gi,
        '</ul>'                                                                             :   /\[\/list:u(:\w+)?\]/gi,
        '</ol>'                                                                             :   /\[\/list:o(:\w+)?\]/gi,
        '<ul class="bb-list-unordered">'                                                    :   /\[list(:(?!u|o)\w+)?\]\s*/gi,
        '<ul class="bb-list-unordered">'                                                    :   /\[list:u(:\w+)?\]\s*/gi,
        '<ol class="bb-list-ordered">'                                                      :   /\[list:o(:\w+)?\]\s*/gi,
        '<ol class="bb-list-ordered,bb-list-ordered-d">'                                    :   /\[list(?::o)?(:\w+)?=1\]\s*/gi,
        '<ol class="bb-list-ordered,bb-list-ordered-lr">'                                   :   /\[list(?::o)?(:\w+)?=i\]\s*/gi,
        '<ol class="bb-list-ordered,bb-list-ordered-ur">'                                   :   /\[list(?::o)?(:\w+)?=I\]\s*/gi,
        '<ol class="bb-list-ordered,bb-list-ordered-la">'                                   :   /\[list(?::o)?(:\w+)?=a\]\s*/gi,
        '<ol class="bb-list-ordered,bb-list-ordered-ua">'                                   :   /\[list(?::o)?(:\w+)?=A\]\s*/gi,

        '<br/>'                                                                             :   /\n/g,

        /*
        TODO: quotes, lists, smileys
        */
    };

    for (let key in regex) {
        if (regex.hasOwnProperty(key)) {
            content = content.replace(regex[key], key);
        }
    }

    return content;
}