package com.endworldhunger.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="UserReport")
public class UserReport {
	@Id
	@Column
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	
	@OneToOne
	@JoinColumn(name="userId")
	User userId;
	
	String reason;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="reportTime")
	Date reportTime;
	
	String reportedBy;
	
	public UserReport() {
		super();
	}
	
	public UserReport(User userId, String reason, Date reportTime, String reportedBy) {
		this.userId = userId;
		this.reason = reason;
		this.reportTime = reportTime;
		this.reportedBy = reportedBy;
	}
	
	public int getId() {
		return this.id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getUserId() {
		return this.userId;
	}
	public void setUserId(User userId) {
		this.userId = userId;
	}
	public String getReason() {
		return this.reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public Date getReportTime() {
		return this.reportTime;
	}
	public void setReportTime(Date reportTime) {
		this.reportTime = reportTime;
	}
	public String getReportedBy() {
		return this.reportedBy;
	}
	public void setReportedBy(String reportedBy) {
		this.reportedBy = reportedBy;
	}
	
}
