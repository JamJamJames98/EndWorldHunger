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
@Table(name="UserReview")
public class UserReview {
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	
	@ManyToOne
	@JoinColumn(name="authorId")
	User author;
	
	@ManyToOne
	@JoinColumn(name="ownerId")
	Provider owner;
	
	int rating;
	
	String comment;
	
	String userType;
	
	public UserReview() {
		super();
	}
	
	public UserReview(int id, User author, Provider owner, int rating, String comment, String userType) {
		super();
		this.id = id;
		this.author = author;
		this.owner = owner;
		this.rating = rating;
		this.comment = comment;
		this.userType = userType;
	}
	
	public int getId() {
		return this.id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getAuthor() {
		return this.author;
	}
	public void setAuthor(User author) {
		this.author = author;
	}
	public Provider getOwner() {
		return this.owner;
	}
	public void setOwner(Provider owner) {
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
