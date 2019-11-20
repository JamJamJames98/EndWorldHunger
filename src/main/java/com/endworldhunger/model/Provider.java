package com.endworldhunger.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.util.Pair;

import com.endworldhunger.service.GoogleAPIService;

@Entity
@Table(name="Provider")
public class Provider {
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	
	String username; 
	
	String password;
	
	String email;
	
	String phoneNumber;
	
	String providerType;
	
	int rating;
	
	String location;
	
	int streak;
	
	String providerName;
	
	Double longitude;
	
	Double latitude;
	
	@Temporal(TemporalType.DATE)
	Date lastStreakUpload;
	
	@Column(name="points")
	int points;
	
	@Column(name="status")
	String status;
	
	public Provider() {
		super();
	}
	
	public Provider(String username, String password, String email,
					String phoneNumber, String providerType, int rating, 
					String location, int points, int streak, String providerName) {
		super();
		this.username=username;
		this.password=password;
		this.email=email;
		this.phoneNumber=phoneNumber;
		this.providerType=providerType;
		this.rating=rating;
		this.location=location;
		this.points=points;
		this.streak=streak;
		this.providerName=providerName;
		//setup longitude and latitude
		List<String> googleAPIResult = GoogleAPIService.getLongLat(location);
		System.out.print(googleAPIResult.get(0));
		this.location = googleAPIResult.get(0);
		System.out.println(location);
		this.longitude = Double.parseDouble(googleAPIResult.get(1));
		this.latitude = Double.parseDouble(googleAPIResult.get(2));
		System.out.println(this.id);

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
	public String getPassword() {
		return this.password;
	}
	public void setPassword(String password) {
		this.password = password;
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
	public String getProviderType() {
		return this.providerType;
	}
	public void setProviderType(String providerType) {
		this.providerType = providerType;
	}
	public int getRating() {
		return this.rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public void setLocation(String location) {
		this.location = location;
		//setup longitude and latitude
		List<String> googleAPIResult = GoogleAPIService.getLongLat(location);
		System.out.print(googleAPIResult.get(0));
		this.location = googleAPIResult.get(0);
		this.longitude = Double.parseDouble(googleAPIResult.get(1));
		this.latitude = Double.parseDouble(googleAPIResult.get(2));
	}
	public String getLocation() {
		return this.location;
	}
	public void setPoints(int points) {
		this.points = points;
	}
	public int getPoints() {
		return this.points;
	}
	public void setStreak(int streak) {
		this.streak = streak;
	}
	public int getStreak() {
		return this.streak;
	}
	public void setLastStreakUpload(Date lastStreakUpload) {
		this.lastStreakUpload = lastStreakUpload;
	}
	public Date getLastStreakUpload() {
		return this.lastStreakUpload;
	}
	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}
	public String getProviderName() {
		return this.providerName;
	}
	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}
	public Double getLongitude() {
		return this.longitude;
	}
	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}
	public Double getLatitude() {
		return this.latitude;
	}
	public String getStatus() {
		return this.status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
