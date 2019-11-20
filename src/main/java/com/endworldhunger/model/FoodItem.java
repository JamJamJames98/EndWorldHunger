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
@Table(name="FoodItem")
public class FoodItem {
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	
	@ManyToOne
	@JoinColumn(name="providerId")
	Provider provider;
	
	int quantity;
	
	String name;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="timePosted")
	Date timePosted;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="expiry")
	Date expiry;
	
	String description;
	
	String image;
	
	public FoodItem() {
		super();
	}
	
	public FoodItem(Provider provider, int quantity, String name, Date timePosted, Date expiry, String description, String image) {
		super();
		this.provider = provider;
		this.quantity=quantity;
		this.name=name;
		this.timePosted=timePosted;
		this.expiry=expiry;
		this.description=description;
		this.image=image;
	}
	
	public int getId() {
		return this.id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Provider getProvider() {
		return this.provider;
	}
	public void setProvider(Provider provider) {
		this.provider = provider;
	}
	public int getQuantity() {
		return this.quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getName() {
		return this.name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getTimePosted() {
		return this.timePosted;
	}
	public void setTimePosted(Date timePosted) {
		this.timePosted = timePosted;
	}
	public Date getExpiry() {
		return this.expiry;
	}
	public void setExpiry(Date expiry) {
		this.expiry = expiry;
	}
	public String getDescription() {
		return this.description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImage() {
		return this.image;
	}
	public void setImage(String image) {
		this.image = image;
	}
}
