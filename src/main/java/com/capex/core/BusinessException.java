package com.capex.core;

@SuppressWarnings("serial")
public class BusinessException extends Exception {
	public BusinessException(String message) {
		super(message);
	}

	public BusinessException(String message, Throwable throwable) {
		super(message, throwable);
	}
}
