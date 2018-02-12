<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page session="true"%>
<!DOCTYPE HTML>
<html class="no-js">
<head>
<meta charset="utf-8">
<title>CAPEX | Srinivasa Farms</title>
<meta name="description" content="">
<meta name="viewport" content="width=device-width">

<link rel="stylesheet" href="res/css/bootstrap.min.css" />
<link rel="stylesheet" href="res/css/styles.css" />
<link rel="stylesheet" href="res/styles/main.css">
<link rel="stylesheet" href="res/styles/sb-admin-2.css">
<link rel="stylesheet" href="res/styles/timeline.css">
<link rel="stylesheet" href="res/css/custom.css">
<link rel="stylesheet" href="res/css/metisMenu.min.css">
<link rel="stylesheet" href="res/css/loading-bar.min.css">
<link rel="stylesheet" href="res/css/font-awesome.min.css" type="text/css">





</head>


<body>
 
	<div class="login-back">
		<div class="col-md-6 right">

			<div class="login-panel panel panel-default mbr-login">

				<div class="panel-heading stylee">
					<h3 class="panel-title padding">
						<img src="res/images/logo.png" alt="logo" />
					</h3>
				</div>
				<div class="panel-body">

					<form role="form" action="<c:url value='/login' />" method='POST'>
						<fieldset>
							<div class="label-cus">
								<label>Sign In</label>
							</div>
								<div style="color: red;font-style: italic;">${error}</div>
							<div class="form-group margin-top">
								<input class="form-control" placeholder="E-mail"
									name="username" type="email" autofocus>
							</div>
							<div class="form-group margin-top">
								<input class="form-control" placeholder="Password"
									name="password" type="password" value="">
									<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
							</div>
							<div class="checkbox">
								<label> <input name="remember" type="checkbox"
									value="Remember Me">Remember Me
								</label>
							</div>
							<!-- Change this to a button or input when using this as a form -->
							<button type="submit"
								class="btn btn-lg btn-success btn-block">Login</button>
						</fieldset>
					</form>
				</div>

			</div>

		</div>
	</div>



</body>



</html>