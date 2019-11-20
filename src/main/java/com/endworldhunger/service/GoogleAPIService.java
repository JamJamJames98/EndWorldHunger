package com.endworldhunger.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONObject;

public class GoogleAPIService {
	public static List<String> getLongLat(String address) {
		try {
			//find api key
			String apiKeyPath = System.getProperty("user.dir")+"/src/main/java/com/endworldhunger/api_key.txt";
			FileReader f = new FileReader(apiKeyPath);
			BufferedReader br = new BufferedReader(f);
			String apiKey = br.readLine();
			br.close();

			//build and send request
			CloseableHttpClient httpClient = HttpClients.createDefault();
			String mainAPIUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
			String addressQueryString = "address=" + address.replace(" ", "%20") + "&";
			String apiKeyQueryString = "key=" + apiKey;
			HttpGet httpGet = new HttpGet(mainAPIUrl+addressQueryString+apiKeyQueryString);
			httpGet.addHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.2 Safari/605.1.15");
			CloseableHttpResponse httpResponse = httpClient.execute(httpGet);
			
			//check status of the response
			if (httpResponse.getStatusLine().getStatusCode() != 200) {
				throw new IOException("Status code is:" + httpResponse.getStatusLine().getStatusCode());
			}
			
			//parse the response content
			BufferedReader reader = new BufferedReader(new InputStreamReader(httpResponse.getEntity().getContent()));
			String inputLine;
			StringBuffer response = new StringBuffer();
			while ((inputLine = reader.readLine()) != null) {
				response.append(inputLine);
			}
			httpClient.close();
			
			//find the longitude and latitude values in response
			JSONObject responseJSON = new JSONObject(response.toString());
			JSONObject results = responseJSON.getJSONArray("results").getJSONObject(0).getJSONObject("geometry").getJSONObject("location");
			List<String> returnedObject = new ArrayList<>();
			returnedObject.add(responseJSON.getJSONArray("results").getJSONObject(0).get("formatted_address").toString());
			returnedObject.add(results.get("lng").toString());
			returnedObject.add(results.get("lat").toString());
			return returnedObject;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new ArrayList<>();
	}
}
