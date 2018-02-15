package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.ColdRoomDAO;
import com.capex.entity.ColdRoom;

@Service
@Transactional
public class ColdRoomService {

	@Autowired
	private ColdRoomDAO coldRoomDAO;
	
	@Autowired
	private UserService userService;
	
	public List<ColdRoom> getColdRoom() {
 		return coldRoomDAO.getColdRoom();
	}
 
	public void addColdRoom(ColdRoom coldRoom, int token) {
		 coldRoomDAO.addColdRoom(coldRoom);
	}

	public void updateColdRoom(ColdRoom coldRoom, int token) {
		coldRoomDAO.updateColdRoom(coldRoom);
	}

	public boolean deleteColdRoom(String token, int id) {
		return coldRoomDAO.deleteColdRoom(id);
	}

	public ColdRoom getColdRoom(int id) {
 		return coldRoomDAO.getColdRoom(id);
	}

}
