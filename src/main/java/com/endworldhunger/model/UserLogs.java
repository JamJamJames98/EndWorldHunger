package com.endworldhunger.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="UserLogs")
public class UserLogs {
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	
	@ManyToOne
	@JoinColumn(name="userId")
	User user;
	
	@ManyToOne
	@JoinColumn(name="providerId")
	Provider provider;
	
	String activity;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="logTime")
	Date logTime;
	
	public UserLogs() {
		super();
	}
	
	public UserLogs(User user, Provider provider, String activity, Date logTime) {
		this.user = user;
		this.provider = provider;
		this.activity = activity;
		this.logTime = logTime;
	}
	public UserLogs(User user, String activity, Date logTime) {
		this.user = user;
		this.activity = activity;
		this.logTime = logTime;
	}
	public UserLogs(Provider provider, String activity, Date logTime) {
		this.provider = provider;
		this.activity = activity;
		this.logTime = logTime;
	}
	
	public int getId() {
		return this.id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getUser() {
		return this.user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Provider getProvider() {
		return this.provider;
	}
	public void setProvider(Provider provider) {
		this.provider = provider;
	}
	public String getActivity() {
		return this.activity;
	}
	public void setActivity(String activity) {
		this.activity = activity;
	}
	public Date getLogTime() {
		return this.logTime;
	}
	public void setLogTime(Date logTime) {
		this.logTime = logTime;
	}
	
}
