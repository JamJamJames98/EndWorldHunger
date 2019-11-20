package com.endworldhunger.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="ProviderReview")
public class ProviderReview {
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	
	@ManyToOne
	@JoinColumn(name="authorId")
	Provider author;
	
	@ManyToOne
	@JoinColumn(name="ownerId")
	User owner;
	
	int rating;
	
	String comment;
	
	String userType;
	
	public ProviderReview() {

	}
	
	public ProviderReview(Provider author, User owner, int rating, String comment) {
		//super();
		this.author = author;
		this.owner = owner;
		this.rating = rating;
		this.comment = comment;
	}
	
	public int getId() {
		return this.id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Provider getAuthor() {
		return this.author;
	}
	public void setAuthor(Provider author) {
		this.author = author;
	}
	public User getOwner() {
		return this.owner;
	}
	public void setOwner(User owner) {
		this.owner = owner;
	}
	public int getRating() {
		return this.rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getComment() {
		return this.comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getUserType() {
		return this.userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
}
