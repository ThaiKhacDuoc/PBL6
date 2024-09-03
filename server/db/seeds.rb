require "json"

teachers_file_path = Rails.root.join("db", "teachers.json")
courses_file_path = Rails.root.join("db", "courses.json")
categories_file_path = Rails.root.join("db", "categories.json")

teachers_file = File.read(teachers_file_path)
courses_file = File.read(courses_file_path)
categories_file = File.read(categories_file_path)

categories_data = JSON.parse(categories_file)
courses_data = JSON.parse(courses_file)
teachers_data = JSON.parse(teachers_file)

teachers_map = {}
teachers_data.each do |teacher|
  account = Account.create!(
    email: Faker::Internet.unique.email,
    password: "password",
    roles: 1
  )

  created_teacher = Teacher.create!(
    account_id: account.id,
    bio: teacher["bio"],
    image_url: teacher["image_100x100"],
    experience: teacher["experience"],
    name: teacher["name"],
    job_title: teacher["job_title"]
  )
  teachers_map[teacher["id"]] = created_teacher.id
end

categories_map = {}
categories_data.each do |category|
  created_category = Category.create!(
    name: category["name"],
    description: category["description"]
  )
  categories_map[category["id"]] = created_category.id
end

levels = %w(Beginner Intermediate Advanced)
category_ids = Category.pluck(:id)
courses_data.each do |course|
  teacher_id = teachers_map[course["teacher_id"]]
  category_id = categories_map[course["category_id"]]
  category_id ||= category_ids.sample if category_ids.any?
  description = course["objectives_summary"].join("\n")

  Course.create!(
    category_id: category_id,
    title: course["title"],
    level: levels.sample,
    description: description,
    teacher_id: teacher_id,
    image_url: course["image_url"]
  )
end

Account.create!(
  email: "admin@mail.com",
  password: "admin123",
  roles: 2
)

50.times do
  account = Account.create!(
    email: Faker::Internet.unique.email,
    password: "password",
    roles: 0
  )

  account.create_user!(
    full_name: Faker::Name.name,
    bio: Faker::Lorem.paragraph(sentence_count: 2),
    goals: Faker::Lorem.paragraph(sentence_count: 2),
    image_url: "https://i.pinimg.com/1200x/ff/c2/dd/ffc2ddb4e8a9074262ca5192f8d86ee1.jpg"
  )
end
