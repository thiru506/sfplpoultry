package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.ColdRoom;

@Repository
@SuppressWarnings("unchecked")
public class ColdRoomDAO extends BaseDAO{

	public List<ColdRoom> getColdRoom() {
		Criteria criteria=getSession().createCriteria(ColdRoom.class);
		return criteria.list();	}
	
	public void addColdRoom(ColdRoom coldRoom) {
  		save(coldRoom);
	}

	public void  updateColdRoom(ColdRoom coldRoom) {
		update(coldRoom);
	}

	public boolean deleteColdRoom(int id) {
		ColdRoom coldRoom=(ColdRoom) getSession().get(ColdRoom.class, id);;
		delete(coldRoom);
 		return false;
	}
	
	public ColdRoom getColdRoom(int id) {
		return (ColdRoom) getSession().get(ColdRoom.class, id);
	}


}
