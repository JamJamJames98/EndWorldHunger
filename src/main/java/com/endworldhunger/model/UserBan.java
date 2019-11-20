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
@Table(name="UserBan")
public class UserBan {
	@Id
	@Column
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	
	@OneToOne
	@JoinColumn(name="UserId")
	User userId;
	
	String reason;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="banTime")
	Date banTime;
	
	String bannedBy;
	
	public UserBan() {
		super();
	}
	
	public UserBan(User userId, String reason, Date banTime, String bannedBy) {
		super();
		this.userId = userId;
		this.reason = reason;
		this.banTime = banTime;
		this.bannedBy = bannedBy;
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
	public void setUserId(User UserId) {
		this.userId = UserId;
	}
	public String getReason() {
		return this.reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public Date getBanTime() {
		return this.banTime;
	}
	public void setBanTime(Date banTime) {
		this.banTime = banTime;
	}
	public String getBannedBy() {
		return this.bannedBy;
	}
	public void setBannedBy(String bannedBy) {
		this.bannedBy = bannedBy;
	}
	
}
