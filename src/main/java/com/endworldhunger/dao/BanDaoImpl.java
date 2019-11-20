package com.endworldhunger.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.endworldhunger.model.ProviderBan;
import com.endworldhunger.model.UserBan;

@Repository
public class BanDaoImpl implements BanDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sf) {
		this.sessionFactory = sf;
	}
	
	@Override
	public UserBan getUserBan(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		UserBan userBan = session.get(UserBan.class, id);
		return userBan;
	}

	@Override
	public ProviderBan getProviderBan(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		ProviderBan providerBan = session.get(ProviderBan.class, id);
		return providerBan;
	}


	@Override
	public Boolean deleteUserBan(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		UserBan userBan = session.load(UserBan.class, new Integer(id));
		if (null != userBan) {
			int idX = userBan.getUserId().getId();
			int updates = session.createQuery(
					"update Provider " +
					"set status = :newStatus " +
					"where id = :userId ")
					.setParameter( "newStatus", "Active")
					.setParameter( "userId", idX)
					.executeUpdate();
			session.delete(userBan);
			return true;
		}
		return false;
	}

	@Override
	public Boolean deleteProviderBan(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		ProviderBan providerBan = session.load(ProviderBan.class, new Integer(id));
		if (null != providerBan) {
			int idX = providerBan.getProviderId().getId();
			int updates = session.createQuery(
					"update Provider " +
					"set status = :newStatus " +
					"where id = :providerId ")
					.setParameter( "newStatus", "Active")
					.setParameter( "providerId", idX)
					.executeUpdate();
			session.delete(providerBan);
			return true;
		}
		return false;
	}

	@Override
	public List<UserBan> getAllUserBan() {
		Session session = this.sessionFactory.getCurrentSession();
		List<UserBan> userBanList = (List<UserBan>) session.createQuery(
				"from UserBan ")
				.getResultList();
		return userBanList;
	}

	@Override
	public List<ProviderBan> getAllProviderBan() {
		Session session = this.sessionFactory.getCurrentSession();
		List<ProviderBan> providerBanList = (List<ProviderBan>) session.createQuery(
				"from ProviderBan ")
				.getResultList();
		return providerBanList;
	}

	@Override
	public UserBan addUserBan(UserBan userBan) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(userBan);
		int id = userBan.getUserId().getId();
		int updates = session.createQuery(
				"update User " +
				"set status = :newStatus " +
				"where id = :userId ")
				.setParameter( "newStatus", "Locked")
				.setParameter( "userId", id)
				.executeUpdate();
		return userBan;
	}

	@Override
	public ProviderBan addProviderBan(ProviderBan providerBan) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(providerBan);
		int id = providerBan.getProviderId().getId();
		int updates = session.createQuery(
				"update Provider" +
				"set status = :newStatus " +
				"where id = :providerId ")
				.setParameter( "newStatus", "Locked")
				.setParameter( "providerId", id)
				.executeUpdate();
		return providerBan;
	}

	@Override
	public List<UserBan> getAllBanOfUser(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		List<UserBan> bans = (List<UserBan>) session.createQuery(
				"from UserBan " +
				"where userId.id = :userId ")
				.setParameter("userId", id)
				.getResultList();
		
		return bans;
	}

	@Override
	public List<ProviderBan> getAllBanOfProvider(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		List<ProviderBan> bans = (List<ProviderBan>) session.createQuery(
				"from ProviderBan " +
				"where providerId.id = :providerId ")
				.setParameter("providerId", id)
				.getResultList();
		
		return bans;
	}

}
