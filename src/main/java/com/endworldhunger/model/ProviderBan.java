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
@Table(name="ProviderBan")
public class ProviderBan {
	@Id
	@Column
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	
	@OneToOne
	@JoinColumn(name="providerId")
	Provider providerId;
	
	String reason;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="banTime")
	Date banTime;
	
	String bannedBy;
	
	public ProviderBan() {
		super();
	}
	
	public ProviderBan(Provider providerId, String reason, Date banTime, String bannedBy) {
		super();
		this.providerId = providerId;
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
	public Provider getProviderId() {
		return this.providerId;
	}
	public void setProviderId(Provider providerId) {
		this.providerId = providerId;
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
