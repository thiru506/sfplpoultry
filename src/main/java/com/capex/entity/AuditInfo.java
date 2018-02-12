package com.capex.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import com.capex.constants.DatabaseConstants;

@Embeddable
public class AuditInfo {

	@Column(name = DatabaseConstants.COL_AUDIT_CREATED_BY)
	private Integer createdBy;

	@Column(name = DatabaseConstants.COL_AUDIT_UPDATED_BY)
	private Integer updatedBy;

	@Column(name =  DatabaseConstants.COL_AUDIT_CREATED_ON)
	private Date createdOn;

	@Column(name =  DatabaseConstants.COL_AUDIT_UPDATED_ON)
	private Date updatedOn;

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	public Date getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}

	public static AuditInfo getInstance(int userid) {
		AuditInfo auditInfo = new AuditInfo();
		auditInfo.setCreatedBy(userid);
		auditInfo.setCreatedOn(new Date());
		return auditInfo;
	}

}
