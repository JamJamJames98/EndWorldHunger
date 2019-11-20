package com.endworldhunger.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
 
/*
 * This is our model class and it corresponds to Customer table in database
 */
@Entity
@Table(name="User")
public class User {

	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
 
	@Column(name="username")
	String username; 
	
	@Column(name="name")
	String name;
	
	@Column(name="password")
	String password;
	
	@Column(name="email")
	String email;
	
	@Column(name="phoneNumber")
	String phoneNumber;
	
	@Column(name="consumerType")
	String consumerType;
	
	@Column(name="rating")
	int rating;
	
	@Column(name="dailyLimit")
	int dailyLimit;
	
	@Column(name="status")
	String status;
 
	public User() {
		super();
	}
	public User(String username, String name, String password, String email, String phoneNumber, String consumerType) {
		super();
		this.username=username;
		this.name=name;
		this.password=password;
		this.email=email;
		this.phoneNumber=phoneNumber;
		this.consumerType=consumerType;
		this.rating=-1;
		if (consumerType.equals("Individual")) {
			this.dailyLimit = 4;
		} else if (consumerType.equals("Charity")) {
			this.dailyLimit = 50;
		} else if (consumerType.equals("Organisation")) {
			this.dailyLimit = 50;
		} else {
			this.dailyLimit = 0;
		}
	}
	public User(String username, String name, String password, String email, String phoneNumber, String consumerType, int rating) {
		super();
		this.username=username;
		this.name = name;
		this.password=password;
		this.email=email;
		this.phoneNumber=phoneNumber;
		this.consumerType=consumerType;
		this.rating=rating;
		if (consumerType.equals("Individual")) {
			this.dailyLimit = 4;
		} else if (consumerType.equals("Charity")) {
			this.dailyLimit = 50;
		} else if (consumerType.equals("Organisation")) {
			this.dailyLimit = 50;
		} else {
			this.dailyLimit = 0;
		}
	}
	
	public int getId() {
		return this.id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return this.username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getName() {
		return this.name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return this.password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getConsumerType() {
		return this.consumerType;
	}
	public void setConsumerType(String consumerType) {
		this.consumerType = consumerType;
		if (consumerType.equals("Individual")) {
			this.dailyLimit = 4;
		} else if (consumerType.equals("Charity")) {
			this.dailyLimit = 50;
		} else if (consumerType.equals("Organisation")) {
			this.dailyLimit = 50;
		} else {
			this.dailyLimit = 0;
		}
	}
	public String getEmail() {
		return this.email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNumber() {
		return this.phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public int getRating() {
		return this.rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getStatus() {
		return this.status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getDailyLimit() {
		return this.dailyLimit;
	}
	public void setDailyLimit(int dailyLimit) {
		this.dailyLimit = dailyLimit;
	}
	
}