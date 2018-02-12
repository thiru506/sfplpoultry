package com.capex.core;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;


@ControllerAdvice(annotations=RestController.class)
public class SpringExceptionHandler {
	
	@ExceptionHandler(value = BusinessException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
	public BusinessException exceptionHandler(Exception exception, WebRequest request){
		exception.printStackTrace();
		return new BusinessException(exception.getLocalizedMessage());
	}
	
	@ExceptionHandler(value = Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public Exception exceptionUnknown(Exception exception, WebRequest request) {
		exception.printStackTrace();
        return new Exception("Fatal Error Please try after some time",exception);
    }

}
