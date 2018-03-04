package com.capex.entity;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.id.IdentifierGenerator;

public class CapexIdGenerator implements IdentifierGenerator{

	public Serializable generate(SessionImplementor session, Object object) throws HibernateException {

        String prefix = "CAP-";
        Connection connection = session.connection();

        try {
            Statement statement=connection.createStatement();

            ResultSet rs=statement.executeQuery("select count(id) as Id from capex.CAPEXBudget");

            if(rs.next())
            {
                int id=rs.getInt(1)+001;
       //         String generatedId = prefix + new Integer(id).toString();
                String generatedId = prefix + String.format("%03d%s", 0, id);
                System.out.println("Generated Id: " + generatedId);
                return generatedId;
            }
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }


		
		return null;
	}

}
