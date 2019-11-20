package com.endworldhunger.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.endworldhunger.service.GoogleAPIService;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="FoodOrder")
public class FoodOrder {
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	
	@ManyToOne
	@JoinColumn(name="userId")
	User userId;
	
	@ManyToOne
	@JoinColumn(name="providerId")
	Provider providerId;
	
	@OneToOne
	@JoinColumn(name="foodItem")
	FoodItem foodItem;
	
	@Column(name="quantity")
	int quantity;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="orderTime")
	Date orderTime;
	

	@Column(name="orderCode")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	String orderCode;
	
	@Column(name="orderStatus")
	String orderStatus;
	
	public FoodOrder() {
		super();
	}
	
	public FoodOrder(User userId, Provider providerId,
			FoodItem foodItem, Date orderTime, String orderStatus, int quantity) {
		super();
		this.userId = userId;
		this.providerId = providerId;
		this.foodItem = foodItem;
		this.orderTime = orderTime;
		this.orderStatus = orderStatus;
		this.quantity = quantity;
	}
	
	public FoodOrder(Date orderTime, String orderStatus) {
		super();
		this.orderTime = orderTime;
		this.orderStatus = orderStatus;
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
	public Provider getProviderId() {
		return this.providerId;
	}
	public void setProviderId(Provider providerId) {
		this.providerId = providerId;
	}
	public FoodItem getFoodItem() {
		return this.foodItem;
	}
	public void setFoodItem(FoodItem foodItem) {
		this.foodItem = foodItem;
	}
	public String getOrderCode() {
		return this.orderCode;
	}
	public Date getOrderTime() {
		return this.orderTime;
	}
	public void setOrderTime(Date orderTime) {
		this.orderTime = orderTime;
	}
	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}
	public String getOrderStatus() {
		return this.orderStatus;
	}
	public void setStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public int getQuantity() {
		return this.quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
		
	
}
