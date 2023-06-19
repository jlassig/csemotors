-- INSERT
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (Tony, Stark, tony @starkent.com, Iam1ronM @n);
-- UPDATE
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony' -- DELETE
DELETE FROM account
WHERE account_firstname = 'Tony' --UPDATE a part of a description that did say "small interiors" with "a huge interior"
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer' --the 'AND' was overkill in this case (small table), but I wanted to know how to do 2 conditions. 
    --INNER JOIN
    --https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-inner-join/      this tutorial shows INNER JOIN and also introduces variables so I don't have to write, "inventory" or "classification" a bunch of times. Nice.
SELECT i.inv_make,
    i.inv_model,
    c.classification_name
FROM inventory i
    INNER JOIN classification c ON i.classification_id = c.classification_id
    AND c.classification_id = 2 --WHERE c.classification_id = 2
    --NOTE : I can either use the AND to have it search for both conditions. OR, use that first condition and then use the WHERE clause.
    --this makes it update two columns!
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/')