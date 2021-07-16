import requests,json,os 
if os.path.exists('courses.json'):
	file = open("courses.json")
	temp = file.read()
	data = json.loads(temp)
	file.close()
else:
	request = requests.get("http://saral.navgurukul.org/api/courses")
	data = request.json()
	s = json.dumps(data)
	with open("courses.json", "w") as file:
		file.write(s)
		file.close()

list_of_id = []
for i in range(len(data["availableCourses"])):
	print(i+1,':',data["availableCourses"][i]["name"])
	list_of_id.append(data["availableCourses"][i]["id"])
print()
choice=int(input("Which course you want to join  "))
print()
for i in range(len(list_of_id)):
    if (choice-1) == i:
        course_name = data['availableCourses'][i]["name"]
        request1=requests.get("http://saral.navgurukul.org/api/courses/"+str(list_of_id[i])+"/exercises")
        subdata=request1.json()

parent = subdata["data"]
f=1
a={}
for i in range(len(parent)):
    print(f'{str(f)} :{parent[i]["name"]}')
    a[str(f)]=parent[i]["slug"]
    c=1
    for j in range(len(parent[i]['childExercises'])):
        z=str(f)+'.'+str(c)
        a[z]=parent[i]['childExercises'][j]["slug"]
        print("  ",z,parent[i]['childExercises'][j]["name"])
        c+=1
    f+=1
print()
user_input=input("Enter which slug you want to see  ")
print()
for i in a:
    if user_input == i:
        request2 = requests.get("http://saral.navgurukul.org/api/courses/12/exercise/getBySlug?slug="+str(a[i]))
        sc = request2.json()
        print(sc['content'])
        break