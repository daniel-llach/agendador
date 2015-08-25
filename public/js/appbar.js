// data
var dataAppbar = [
    {
        nombre: "escenarios",
        modal: {
            asset: "selector",
            data: scenarios
        }
    },
    {
        nombre: "menuapps",
        icon: "menuapps",
        modal: {
            asset: "itemlist",
            data: [
                {
                    id: "1",
                    nombre: "mantenedores",
                    active: true,
                    icon: "mantenedores.svg",
                    sigla: "mantenedores",
                    url: "#"
                },
                {
                    id: "2",
                    nombre: "procesos",
                    active: false,
                    icon: "procesos.svg",
                    sigla: "procesos",
                    url: "https://www.google.cl/url?sa=t&rct=j&q=&esrc=s&source=video&cd=1&cad=rja&uact=8&sqi=2&ved=0CBwQuAIwAA&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DoHg5SJYRHA0&ei=CP2TVY-8MMuz-QHal5m4CA&usg=AFQjCNEcy3X8QxEz3ZqmxAznmt4YfNijBQ&sig2=_g2_2G4CgQDeCFcYNjoRSw"
                }
            ]
        }
    },
    // {
    //     nombre: "messages",
    //     icon: "messages",
    //     modal: {
    //         asset: "listItems",
    //         template: "messages",
    //         messages: [
    //             {
    //                 id: "r654r",
    //                 content: "mensaje1",
    //                 type: "message",
    //                 from: "user12"
    //             },
    //             {
    //                 id: "re5re",
    //                 content: "mensaje2",
    //                 type: "warning",
    //                 from: "system"
    //             },
    //             {
    //                 id: "o988w",
    //                 content: "mensaje2",
    //                 type: "succes",
    //                 from: "system"
    //             }
    //         ]
    //     }
    // },
    {
        nombre: "loginbar",
        modal: {
            asset: "usercard",
            data: [
                {
                    active: true,
                    id: "8y87a6y8a7",
                    nombre: "Felipe Meneses",
                    thumbnail: "4908651.png",
                    profile: "admin"
                }
            ]
        }
    },
    {
        nombre: "idioma",
        modal: {
            asset: "itemlist",
            data: [
                {
                    id: "1",
                    nombre: "Español",
                    sigla: "CL",
                    icon: "chile.svg",
                    active: true,
                    url: "#"
                },
                {
                    id: "2",
                    nombre: "Português",
                    sigla: "BR",
                    icon: "brasil.svg",
                    active: false,
                    url: "https://www.google.cl/url?sa=t&rct=j&q=&esrc=s&source=video&cd=1&cad=rja&uact=8&ved=0CBwQuAIwAA&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D2QxSxEDxi5A&ei=v_yTVbmcCsWkwAT0truACw&usg=AFQjCNEwX2Xg91QQYPQQ7Uth54TRQ-DGBg&sig2=euzmOCidCTeak_bfHV8n-w"
                }
            ]
        }
    }
];

// start appbar
var appbar = new AppBar("appbar");
var appbarChannel = appbar.Channel;
appbar.start({
    items : dataAppbar,
    region: App.RootView.getRegion("outer")
});
