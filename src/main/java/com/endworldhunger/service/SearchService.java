package com.endworldhunger.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import com.endworldhunger.dao.ProviderDao;
import com.endworldhunger.dao.FoodItemDao;
import com.endworldhunger.model.FoodItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.json.JSONObject;
import org.json.JSONArray;

@Service("searchService")
public class SearchService {
	
	@Autowired
	ProviderDao providerDao;
	
	@Autowired
	FoodItemDao foodItemDao;
	
	@Transactional
	public JSONObject searchProviders(String searchString, String longitude, String latitude, String consumerType) {
		Date currentDate = calculateCurrentDate();
		Double maxDistance = calculateMaxDistance(consumerType);
		JSONObject results = new JSONObject();
		
		List<Object[]> providerData = providerDao.getProviderData(searchString, longitude, latitude, maxDistance);
		if (providerData.size() == 0) {
			return results;
		}
		/*
		 * Note:
		 * [0] - distance
		 * [1] - id
		 * [2] - providerName
		 * [3] - location
		 * [4] - providerType
		 */
		JSONArray providerJSONData = new JSONArray();
		for (int i = 0; i < providerData.size(); i++) {
			JSONObject tempProvider = new JSONObject();
			tempProvider.put("id", (int) providerData.get(i)[1]);
			tempProvider.put("providerName", (String) providerData.get(i)[2]);
			tempProvider.put("distance", (Double) providerData.get(i)[0]);
			tempProvider.put("location", (String) providerData.get(i)[3]);
			tempProvider.put("providerType", (String) providerData.get(i)[4]);
			tempProvider.put("quantity", (int) foodItemDao.getFoodQuantity(tempProvider.getInt("id"), currentDate));
			tempProvider.put("timePosted", (String) foodItemDao.getMostRecentListing(tempProvider.getInt("id"), currentDate));
			providerJSONData.put(tempProvider);
		}
		return processResults(results, providerJSONData);
	}
	
	@Transactional
	public JSONObject searchFood(String searchString, String longitude, String latitude, String consumerType) {
		Date currentDate = calculateCurrentDate();
		Double maxDistance = calculateMaxDistance(consumerType);
		JSONObject results = new JSONObject();
		
		List<Object[]> providerData = providerDao.getAllEligibleProviderData(longitude, latitude, maxDistance);
		if (providerData.size() == 0) {
			return results;
		}
		/*
		 * Note:
		 * [0] - distance
		 * [1] - id
		 * [2] - providerName
		 * [3] - location
		 * [4] - providerType
		 */
		JSONArray foodItemJSONData = new JSONArray();
		for (int i = 0; i < providerData.size(); i++) {
			List<FoodItem> foodItemData = foodItemDao.getAvailableFood((int)providerData.get(i)[1], searchString, currentDate);
			if (foodItemData.size() == 0) {
				continue;
			}
			/*
			 * Note:
			 * [0] - id
			 * [1] - name
			 * [2] - quantity
			 * [3] - timePosted
			 */
			for (int j = 0; j < foodItemData.size(); j++) {
				JSONObject tempFoodItem = new JSONObject();
				/*tempFoodItem.put("id", (int) foodItemData.get(j)[0]);
				tempFoodItem.put("name", (String) foodItemData.get(j)[1]);
				tempFoodItem.put("quantity", (int) foodItemData.get(j)[2]);
				tempFoodItem.put("timePosted", (String) foodItemData.get(j)[3].toString());*/
				tempFoodItem.put("foodItemData", foodItemData.get(j));
				System.out.println(foodItemData.get(j));
				tempFoodItem.put("providerId", (int) providerData.get(i)[1]);
				tempFoodItem.put("providerName", (String) providerData.get(i)[2]);
				tempFoodItem.put("distance", (Double) providerData.get(i)[0]);
				tempFoodItem.put("location", (String) providerData.get(i)[3]);
				tempFoodItem.put("providerType", (String) providerData.get(i)[4]);	
				foodItemJSONData.put(tempFoodItem);
			}
		}
		if (foodItemJSONData.length() == 0) {
			return results;
		} else {
			return processResults(results, foodItemJSONData);
		}
	}
	
	private JSONObject processResults(JSONObject results, JSONArray abstractJSONData) {
		//try {
			Double largestDistance = abstractJSONData.getJSONObject(0).getDouble("distance");
			Double smallestDistance = abstractJSONData.getJSONObject(0).getDouble("distance");
			FoodItem tempFoodData = (FoodItem) abstractJSONData.getJSONObject(0).get("foodItemData");
			int largestQuantity = tempFoodData.getQuantity();
			int smallestQuantity = tempFoodData.getQuantity();
			Date oldestTimePosted = null;
			Date newestTimePosted = null;
			if (tempFoodData.getTimePosted() != null) {
				oldestTimePosted = tempFoodData.getTimePosted();
				newestTimePosted = tempFoodData.getTimePosted();
				//oldestTimePosted = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").parse(abstractJSONData.getJSONObject(0).getString("timePosted"));
				//newestTimePosted = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").parse(abstractJSONData.getJSONObject(0).getString("timePosted"));
			}
			
			for (int i = 1; i < abstractJSONData.length()-1; i++) {
				tempFoodData = (FoodItem) abstractJSONData.getJSONObject(i).get("foodItemData");
				Double currentDistance = abstractJSONData.getJSONObject(i).getDouble("distance");
				if (currentDistance > largestDistance) {
					largestDistance = currentDistance;
				}
				if (currentDistance < smallestDistance) {
					smallestDistance = currentDistance;
				}
				int currentQuantity = tempFoodData.getQuantity();
				if (currentQuantity > largestQuantity) {
					largestQuantity = currentQuantity;
				}
				if (currentQuantity < smallestQuantity) {
					smallestQuantity = currentQuantity;
				}
				if (tempFoodData.getTimePosted() != null) {
					Date currentMostRecentListing = tempFoodData.getTimePosted();
					if (newestTimePosted == null) {
						newestTimePosted = currentMostRecentListing;
					} else if (currentMostRecentListing.after(newestTimePosted)) {
						newestTimePosted = currentMostRecentListing;
					}
					if (oldestTimePosted == null) {
						oldestTimePosted = currentMostRecentListing;
					} else if (currentMostRecentListing.before(oldestTimePosted)) {
						oldestTimePosted = currentMostRecentListing;
					}
				}
			}			
			results.put("largestDistance", largestDistance);
			results.put("smallestDistance", smallestDistance);
			results.put("largestQuantity", largestQuantity);
			results.put("smallestQuantity", smallestQuantity);
			if (oldestTimePosted == null) {
				results.put("oldestMostRecentListing", "");
			} else {
				results.put("oldestMostRecentListing", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").format(oldestTimePosted));
			}
			if (newestTimePosted == null) {
				results.put("newestMostRecentListing", "");
			} else {
				results.put("newestMostRecentListing", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").format(newestTimePosted));
			}
			results.put("data", abstractJSONData);
		/*} catch (ParseException e) {	
			System.out.println("Failed to get maximum bounds for search data");
			e.printStackTrace();
		}*/
		return results;
	}
	
	private Double calculateMaxDistance(String consumerType) {
		if (consumerType.equals("Individual")) {
			return 5.0;
		} else if (consumerType.equals("Charity")) {
			return 20.0;
		} else if (consumerType.equals("Organisation")) {
			return 30.0;
		} else {
			return null;
		}
	}
	
	private Date calculateCurrentDate() {
		Date date = new Date();
		try {
			date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").parse(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").format(new Date()));
		} catch (ParseException e) {
			System.out.println("Failed to parse current date");
			e.printStackTrace();
		}
		return date;
	}

}
