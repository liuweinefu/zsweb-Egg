<!-- <!DOCTYPE html> -->

<html>

<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <!-- 若页面需默认用极速核，增加标签：
    <meta name="renderer" content="webkit"> 
    若页面需默认用ie兼容内核，增加标签：
    <meta name="renderer" content="ie-comp"> 
    若页面需默认用ie标准内核，增加标签：
    <meta name="renderer" content="ie-stand"> -->

    <title>关承堂管理系统4.0</title>
    <!-- <link rel="stylesheet" type="text/css" href="./dropify/css/dropify.min.css"> -->
    <script type="text/javascript" src="/public/jquery-3.4.0.min.js"></script>

    <!-- <link rel="stylesheet" type="text/css" href="/public/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="/public/easyui/themes/icon.css">
    <script type="text/javascript" src="/public/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="/public/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="/public/easyui/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="/public/easyui/datagrid-detailview.js"></script>
    <script type="text/javascript" src="/public/easyui/datagrid-groupview.js"></script>
    <script type="text/javascript" src="/public/easyui/locale/easyui-lang-zh_CN.js"></script> -->
    <!--<script type="text/javascript" src="./javascripts/bluebird.min.js"></script>-->
    <!--<script type="text/javascript" src="./jscode/webF.js"></script>-->
    <!--<script type="text/javascript" src="./jscode/local.js"></script>-->


    <!-- <script type="text/javascript" src="./dropify/js/dropify.min.js"></script> -->
    <!-- <script type="text/javascript" src="/public/mainPanel.js"></script> -->
    <!-- 
    <script>
        var csrftoken = Cookies.get('csrfToken');

        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader('x-csrf-token', csrftoken);
                }
            },
        });
    </script> -->

</head>



<body>
    <form method="POST" action="http://localhost:7001/upload?_csrf={{ ctx.csrf | safe }}" enctype="multipart/form-data">
        title: <input name="title" />
        file: <input name="file" type="file" />
        <button type="submit">upload</button>
    </form>


</body>

</html>