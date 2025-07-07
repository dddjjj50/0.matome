■ポップアップ
<script>window.alert("JavaScripttの練習");</script>　　//OKしかでない
<script>window.confirm("こんにちは。");</script>　　//OKとキャンセルがでる
<script>window.prompt("こんにちは。");</script>	　//OKとキャンセルとテキストボックスが出る
ヘッダに記述　ページを読み込む前に警告出る
ボディに記述　ページを読み込んだあとに警告出る。

■tryとか
JSPではキャッチしない。自動でやってくれる。try-catchいらない。

■コネクションオブジェクト　JavaとSQLをつなぐオブジェクト。
close処理が必要

■System.ou.print(sql)で確認できる。

🧱 HTML
- ただのマークアップ言語（表示専用）
- Javaなどのプログラムは書けない
- ユーザーに「見せる」部分だけ
📌 例：<h1>こんにちは</h1> → これだけじゃボタン押しても何も起こらない

🔄 JSP（JavaServer Pages）　表示
- HTMLにJavaを埋め込めるテンプレート＝JavaScript
- <% デリミター %> や <%= %> で Javaコードが書ける。
- サーバーでJSPファイルを一度コンパイルしてJavaクラスになる
- 表示処理と軽いロジックに向いてる
🧩 よく使う場面：
- フォームに値を埋め込む（<input value="<%= xxx %>" />）
- SQL結果を表示するループなど

⚙️ サーブレット　交通整理
- 完全なJavaのクラス。JavaScriptじゃなくてがっつりjava
- HTMLは out.print() などで出力する
- 表示は苦手、でも複雑な処理は得意
🧠 よく使う場面：
- DBにデータ保存、更新、削除処理
- セッション管理、ログイン判定など
- 他のページへのリダイレクトやフォワード

💖Beans　ロジック
インスタンスを格納するには「～.setAttribute()」メソッドを使う
エクリプスでは新規→クラスから作る

パラメーターとは、Javaにおいてメソッド内で使用される外部から与えられる値のことを指します。
パラメーターと似た用語として「引数」という言葉が利用されていますが、厳密には異なる意味を持つ用語です。
パラメーターは、メソッドの中で利用するために定義された値のことを指しています。
対して引数は、メソッドを呼び出す際に指定する値のことを指します。


-----------------
JSPアクションタグ
-----------------------
<jsp:useBean id="testBean" class="chap05.Sample01Bean" scope="request"/>
<jsp:setProperty name="testBean" property="id" value="100"/>
<jsp:setProperty name="testBean" property="name" value="USAMI"/>
<h2>あなたのIDは<jsp:getProperty property="id" name="tesBean"/></h2>
<h2>お名前は<jsp:getProperty property="name" name="tesBean"/>さんです。</h2>

■useBean　特定のBeanをインスタンス生成する
<jsp:useBean>タグに属性の設定を行うとインスタンス生成される
  属性の種類
    id　名前を定義、参照変数名と同義。同じオブジェクトがスコープ内に存在するときはそのまま使える。
    class　Beanのクラス名。完全修飾名で記述
    scope　このオブジェクトの有効範囲。種類は4つ
      1.page　そのページのみ（デフォルト）。そのページのみで必要な場合に使用
      2.request　リクエストオブジェクトが有効な範囲。自分のページとインクルードまたはフォワーディグされたページでのみ有効
      3.session　同一セッション内。ユーザーに割り当てられたセッション内で共有できる。ほかのユーザーには参照されない
      4.application　同一アプリケーション内。現在のアプリケーション内すべてで共有され、クラス間やファイル間、ユーザーすべてで有効
    type
    beanName

■<jsp:setProperty>　setter()から呼び出した値を代入
  属性の種類
    name　格納されている属性名。useBeanのid属性
    priperty　プロパティ名（フィールド名）。代入するフィールド名
    value　セットする値。代入する値。
    param　リクエストパラメーター名

■<jsp:getProperty>　getter()から値を取得


------------------
coreタグ
----------------
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="chap05.*" %>
<%@ page import="java.util.ArrayList" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- ↑urlじゃないのかな？ -->
<%
	String message="Good morning";
	ArrayList<TestELBean> al=new ArrayList<>();
	TestELBean bean=new TestELBean();
	bean.setId(101);
	bean.setName("Taro");
	al.add(bean);
	
	bean=new TestELBean();
	bean.setId(102);
	bean.setName("Jiro");
	al.add(bean);
	
	bean=new TestELBean();
	bean.setId(103);
	bean.setName("Hanako");
	al.add(bean);
	
	bean=new TestELBean();
	bean.setId(104);
	bean.setName("Yoshiko");
	al.add(bean);
	
	request.setAttribute("msg",message);
	request.setAttribute("list",al);
	
	request.setAttribute("score",75);
	request.setAttribute("oneData",bean);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>JSTL Test</title>
</head>
<body>
	<h1>JSTL Test</h1>
	
	<h3>変数の出力</h3>
	<p>スコープにあるオブジェクトを出力</p>
	<p>c:out を使う場合 : <c:out value="${msg }"/></p>
	<p>c:out を使わない：${msg }</p>
	<p>フィールドがない場合：${oneData.data }
	<hr/>
	
	<h3>変数をセット</h3>
	<c:set var="data" value="Variable" />　//varは繰り返し内で使用する変数名
	<p>c:setでセットされた変数を利用 : ${data }</p>
	<hr/>
	
	<h3>繰り返し c:forEach if c:if</h3>
	<c:forEach var="bean" items="${list }">　//varは繰り返しないで使用する変数名、itemsはスコープにあるオブジェクト変数名
		<c:if test="${bean.id %2==0 }">
			<div>id : ${bean.id }  name : ${bean.name }</div>
		</c:if>
	</c:forEach>
	<br>
	
	<h3>ループカウンターを使いたいとき</h3>
	<c:forEach var="bean" items="${list }" varStatus="vst">	//varStatusはforEachの属性。下記に詳細
		<div>${vst.count } id : ${bean.id }  name : ${bean.name }</div>
	</c:forEach>
	<hr/>
	
	<h3>if～else文　c:choose</h3>
	<div>Score = ${score }</div>
	<p>
		<c:choose>
			<c:when test="${score>=80 }">合格</c:when>
			<c:when test="${score>=60 }">補欠合格</c:when>
			<c:otherwise>不合格</c:otherwise>
		</c:choose>
	</p>
	
</body>
</html>

※varStatusはforEachの属性。
・count　現在の繰り返い回数。1から始まる。
・index　0から始まるループカウンターの現在地
・first　ループの最初かどうか（turue/false)
・last　ループの最後かどうか（turue/false)
・begin　ループカウンターの初期値（varStatusのindexと同期）　<c:forEach内に記述する
・end　ループカウンターの最終地　<c:forEach内に記述する
・step　ループカウンターの繰り上げ数　<c:forEach内に記述する
・current　var属性の変数に格納されている現在のオブジェクト

サーブレット---------------------------------Java Beans
Web処理の制御（コントローラー）--役割--データの保持・操作（モデル）
サーバー側で動く、HTTPリクエストごと----インスタンスで自由に扱える
ブラウザから直接リクエストされる---------他のクラスから呼び出される
URLごとの処理分岐、リクエスト受け取り----DBデータの保持、フォーム入力の受け渡し
doGet, doPost 必須------------------getter, setter を持つ、引数なしコンストラクターあり
